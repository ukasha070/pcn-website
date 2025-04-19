from django.contrib import admin

# Register your models here.
from .models import Payment

from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'phone_number',
        'amount',
        'currency',
        'country',
        'valid',
        'vote_count',
        'created_at',
    )
    list_filter = (
        'currency',
        'country_code',
        'valid',
        'created_at',
    )
    search_fields = (
        'full_name',
        'phone_number',
        'email',
        'merchant_reference',
        'order_tracking_id',
    )
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)
