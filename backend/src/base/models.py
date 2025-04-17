
from django.db import models
from decimal import Decimal

from datetime import timezone

from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.exceptions import ValidationError
from django.core.validators import MinLengthValidator, MaxLengthValidator

from core.custom_send_email import send_newsletter_email


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)  # For future unsubscriptions

    def __str__(self):
        return self.email


# models.py
class Donation(models.Model):
    DONATION_STATUS = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    # Donor Information
    donor_name = models.CharField(max_length=255)
    donor_email = models.EmailField()

    # Donation Information
    amount_donated = models.DecimalField(
        # Amount in UGX
        max_digits=10, decimal_places=2, default=Decimal('0.00'))
    # For what the donation is made (e.g., general, project name)
    donation_purpose = models.CharField(max_length=255, blank=True, null=True)

    # Payment Information
    payment_status = models.CharField(
        max_length=20, choices=DONATION_STATUS, default='pending')
    transaction_id = models.CharField(
        max_length=255, unique=True)  # Unique Transaction ID

    # Time Info
    date_donated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Donation of {self.amount_donated} UGX by {self.donor_name}"

    def save(self, *args, **kwargs):
        # Ensure the donation amount is a positive value
        if self.amount_donated <= 0:
            raise ValueError("Donation amount must be greater than 0")
        super().save(*args, **kwargs)


# Create a custom validator for min length
def validate_message_content(value):
    if len(value) < 10:
        raise ValidationError("Message must be at least 10 characters long.")
    if len(value) > 500:
        raise ValidationError("Message must be no longer than 500 characters.")


class Message(models.Model):
    sender_name = models.CharField(
        max_length=100,
        # Ensuring name has at least 5 characters
        validators=[MinLengthValidator(5)],
    )
    sender_email = models.EmailField()
    message = models.TextField(
        validators=[MinLengthValidator(10), MaxLengthValidator(
            500), validate_message_content]
    )
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender_name} at {self.sent_at}"


class NewsletterMessage(models.Model):
    subject = models.CharField(max_length=255)
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    is_sent = models.BooleanField(default=False)

    def __str__(self):
        return self.subject


@receiver(post_save, sender=NewsletterMessage)
def send_newsletter_to_active_users(sender, instance, created, **kwargs):
    if created and not instance.is_sent:
        # Get all active users
        active_users = NewsletterSubscriber.objects.filter(is_active=True)

        # Send the newsletter to each active user
        for user in active_users:
            send_newsletter_email(to_email=user.email, subject=instance.subject, recipient_name="Sir/Madam,",
                                  body_content=instance.content, cta_link=None, cta_text=None, logo_url=None)

        # Mark the message as sent
        instance.is_sent = True
        instance.save()
