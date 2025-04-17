# serializers.py
from rest_framework import serializers
from .models import NewsletterSubscriber, Message


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'subscribed_at']
        read_only_fields = ['id', 'subscribed_at']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['sender_name', 'sender_email', 'message', 'sent_at']
