from django.db import models

from events.models import Candidate

from decimal import Decimal


class Payment(models.Model):
    candidate = models.ForeignKey(
        Candidate, on_delete=models.CASCADE, related_name="payments")
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    description = models.TextField(max_length=250)
    currency = models.CharField(max_length=10, choices=[
        ('UGX', 'Ugandan Shilling'),
        ('KES', 'Kenyan Shilling'),
        ('TZS', 'Tanzanian Shilling'),
    ], default='UGX')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    email = models.EmailField()
    country = models.CharField(max_length=100)
    country_code = models.CharField(max_length=10, choices=[
        ('UG', 'Uganda'),
        ('KE', 'Kenya'),
        ('TZ', 'Tanzania'),
        ('RW', 'Rwanda'),
        ('MW', 'Malawi'),
        ('ZM', 'Zambia'),
        ('ZW', 'Zimbabwe'),
    ], default='UG')
    created_at = models.DateTimeField(auto_now_add=True)

    valid = models.BooleanField(default=False)
    vote_count = models.IntegerField(default=0)

    merchant_reference = models.CharField(
        max_length=100, null=True, blank=True)
    order_tracking_id = models.CharField(max_length=100, null=True, blank=True)

    def clean(self):
        if self.amount < Decimal('1000.00'):
            raise ValidationError(
                {'amount': 'Amount must be greater than or equal to 1000.'})
        if self.amount % Decimal('1000.00') != 0:
            raise ValidationError(
                {'amount': 'Amount must be a multiple of 1000.'})

    def __str__(self):
        return f"{self.full_name} - {self.amount} {self.currency}"


class Donation(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="UGX")
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    merchant_reference = models.CharField(
        max_length=100, null=True, blank=True)
    order_tracking_id = models.CharField(max_length=100, null=True, blank=True)
    valid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.full_name} donated {self.amount}"
