import requests
import uuid
import json
from decouple import config

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Payment, Donation
from .serializers import PaymentSerializer
from .utils import pesapal_api, extract_names, get_country_code
from rest_framework.exceptions import ValidationError

from django.conf import settings
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from core.custom_send_email import send_vote_message


GET_PESAPAL_TRANSACTION_STATUS_URL = getattr(
    settings, 'GET_PESAPAL_TRANSACTION_STATUS_URL', None)
SUBMIT_PESAPAL_ORDER_REQ_URL = getattr(
    settings, 'SUBMIT_PESAPAL_ORDER_REQ_URL', None)
PESAPAL_IPN_ID = getattr(
    settings, 'PESAPAL_IPN_ID', None)


class CreateDonationView(APIView):
    def post(self, request):
        serializer = DonationSerializer(data=request.data)
        if serializer.is_valid():
            donation = serializer.save()
            return Response({
                "message": "Donation created successfully.",
                "donation": DonationSerializer(donation).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DonationCallbackAPIView(APIView):
    def get(self, request, *args, **kwargs):
        order_tracking_id = request.query_params.get('OrderTrackingId', None)
        if not order_tracking_id:
            return Response({"error": "Missing OrderTrackingId"}, status=status.HTTP_400_BAD_REQUEST)

        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }

        try:
            response = requests.get(GET_PESAPAL_TRANSACTION_STATUS_URL, headers=headers, params={
                "orderTrackingId": order_tracking_id
            })
            response.raise_for_status()
            data = response.json()

        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)

        if data.get("status_code") == 1 and data.get("payment_status_description") == "Completed":
            amount = data.get("amount", 0)
            try:
                donation_obj = get_object_or_404(
                    Donation, order_tracking_id=order_tracking_id)

                body_content = f"Hello {donation_obj.full_name}, \n we appeciate your effort we have received your donation of UGX {amount} \n\n Thank you soo much, we are reaching you very soon, if you have any concern email us back."
                send_vote_message(
                    donation_obj.email, vote_count, donation_obj.full_name, body_content)
                return Response({"message": "success", "votes": vote_count}, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PaymentCreateView(generics.CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    def perform_create(self, serializer):
        token = pesapal_api.get_pesapal_token()

        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }

        # initialize Payment
        candidate_slug = serializer.validated_data.get("candidate", "")
        full_name = serializer.validated_data.get("full_name", "")
        phone_number = serializer.validated_data.get("phone_number", "")
        currency = serializer.validated_data.get("currency", "")
        amount = serializer.validated_data.get("amount", "")
        email = serializer.validated_data.get("email", "")
        country = serializer.validated_data.get("country", "")
        country_code = get_country_code(country)

        description = f"payment votes for {candidate_slug}"

        # payment data
        data = {
            "id": str(uuid.uuid4()),
            "currency": currency,
            "amount": int(amount),
            "description": description,
            "callback_url": "http://localhost:5173/vote/",
            "notification_id": PESAPAL_IPN_ID,
            "branch": "Prosfygas Christian Network ",
            "billing_address": {
                "email_address": email,
                "phone_number": phone_number,
                "country_code": country_code,
                "first_name": extract_names(full_name)["first_name"],
                "last_name": extract_names(full_name)["last_name"],
                "line_1": "Pesapal Limited",
                "state": country,
            }
        }

        print(country, country_code)

        # submitted order
        def submit_order(data: dict):
            response = requests.post(
                SUBMIT_PESAPAL_ORDER_REQ_URL, headers=headers, json=data)
            if response.status_code == 200:
                json_data = response.json()
                if data.get("error", {}).get("code") == "missing_unique_id":
                    data["id"] = str(uuid.uuid4())
                    response = submit_order(data=data)
            return response

        res = submit_order(data)
        json_data = res.json()
        if json_data["error"]:
            raise ValidationError(
                json_data["error"].get("message", "Unknown error"))

        serializer.validated_data["merchant_reference"] = json_data["merchant_reference"]
        serializer.validated_data["order_tracking_id"] = json_data["order_tracking_id"]

        serializer.save(description=description)


class PaymentCallback(APIView):
    def get(self, request, *args, **kwargs):
        token = pesapal_api.get_pesapal_token()
        order_tracking_id = request.query_params.get('OrderTrackingId', None)

        if not order_tracking_id:
            return Response({"error": "Missing OrderTrackingId"}, status=status.HTTP_400_BAD_REQUEST)

        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }

        try:
            # get transiton status
            response = requests.get(GET_PESAPAL_TRANSACTION_STATUS_URL, headers=headers, params={
                "orderTrackingId": order_tracking_id
            })
            response.raise_for_status()
            data = response.json()
            print("this is the data ", data, token)

        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)

        if data.get("status_code") == 1 and data.get("payment_status_description") == "Completed":
            amount = data.get("amount", 0)
            return_data = {
                "event_slug": "",
                "candidate_slug": "",
            }

            try:
                # vote_count = int(int(amount) / 1000)
                vote_count = 30
                payment_obj = get_object_or_404(
                    Payment, order_tracking_id=order_tracking_id)

                candidate_obj = payment_obj.candidate
                return_data["candidate_slug"] = candidate_obj.slug
                return_data["event_slug"] = candidate_obj.event.slug
                return_data["full_name"] = candidate_obj.full_name

                # create and add vote it not valid
                if not payment_obj.valid:
                    payment_obj.valid = True
                    payment_obj.vote_count = vote_count

                    candidate_obj.vote_count = vote_count + candidate_obj.vote_count

                    payment_obj.save()
                    candidate_obj.save()

                    body_content = f"Hello thank you {payment_obj.full_name}, \n You paid UGX {amount} which is worth to {vote_count} \n Your candidate {candidate_obj.full_name} has a total of {candidate_obj.vote_count} \n\n if you have any concern email us back."

                    send_vote_message(
                        payment_obj.email, vote_count, payment_obj.full_name, body_content)

                    return Response({"message": "success", "votes": vote_count, **return_data}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Already counted.", "votes": vote_count, **return_data}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Invalid order id or uncompleted payment"}, status=status.HTTP_400_BAD_REQUEST)
