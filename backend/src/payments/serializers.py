
from rest_framework import serializers
from .models import Payment, Donation
from events.models import Candidate


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = [
            'id',
            'full_name',
            'email',
            'amount',
            'currency',
            'message',
            'merchant_reference',
            'order_tracking_id',
            'valid',
            'created_at',
        ]
        read_only_fields = ['created_at', 'valid']


class PaymentSerializer(serializers.ModelSerializer):
    candidate = serializers.SlugRelatedField(
        slug_field='slug',
        queryset=Candidate.objects.all()
    )
    order_tracking_id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id',
            'candidate',
            'full_name',
            'phone_number',
            'currency',
            'amount',
            "country_code",
            'email',
            'country',
            'order_tracking_id',
            'created_at',
        ]
        read_only_fields = ['created_at']

    def get_order_tracking_id(self, obj):
        return str(obj.order_tracking_id)
