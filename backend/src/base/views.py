# views.py
from .models import Message
from django.db.models import Q
from django.http import JsonResponse
from django.conf import settings

from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
# views.py

from .models import Donation
from .models import NewsletterSubscriber

from core.custom_send_email import send_html_email

from events.serializers import EventSerializer, CandidateSerializer
from events.models import Event, Candidate

from blogs.models import BlogPost
from blogs.serializers import BlogPostSerializer

from .serializers import NewsletterSubscriberSerializer, MessageSerializer


class NewsletterSubscribeView(generics.CreateAPIView):
    """
    Allows users to subscribe to the newsletter
    """
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer


class SendMessageView(generics.CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        message = serializer.save()
        message_data = MessageSerializer(message).data  # Already a dict
        body_content = f"{message_data['message']} \n Mail be on ${sender_email}"
        send_html_email(
            to_email=settings.FROM_EMAIL,
            subject="Email From Website",
            recipient_name=message_data['sender_name'],
            body_content=body_content,
            cta_link="None",
            cta_text="View Event",
            logo_url="None"
        )

        return message


class BlogSearchView(generics.ListAPIView):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        if query:
            return BlogPost.objects.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query),
                is_published=True
            ).order_by('-created_at')
        return BlogPost.objects.none()


class EventSearchView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        if query:
            return Event.objects.filter(
                Q(title__icontains=query) |
                Q(description__icontains=query),
            ).order_by('end_datetime')
        return Event.objects.none()


class CandidateSearchView(generics.ListAPIView):
    serializer_class = CandidateSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        if query:
            return Candidate.objects.filter(
                Q(full_name__icontains=query) |
                # Assuming vote_number is a string or you can cast it as needed
                Q(bio__icontains=query) |
                Q(vote_number__icontains=query)
                # Optionally, order by vote_number or any other field
            ).distinct().order_by('-vote_number')
        return Candidate.objects.none()  # If no query is provided, return no


class ProcessDonationView(APIView):
    def post(self, request, *args, **kwargs):
        donor_name = request.data.get('donor_name')
        donor_email = request.data.get('donor_email')
        amount_donated = request.data.get('amount_donated')
        donation_purpose = request.data.get('donation_purpose')
        transaction_id = request.data.get('transaction_id')

        # Check if the donation amount is valid (greater than 0)
        if amount_donated <= 0:
            return JsonResponse({"error": "Donation amount must be greater than 0"}, status=status.HTTP_400_BAD_REQUEST)

        # Create the donation record
        donation = Donation.objects.create(
            donor_name=donor_name,
            donor_email=donor_email,
            amount_donated=amount_donated,
            donation_purpose=donation_purpose,
            transaction_id=transaction_id,
            payment_status="completed"  # Assuming payment is successful in this case
        )

        return JsonResponse({"message": "Donation successful!"}, status=status.HTTP_201_CREATED)
