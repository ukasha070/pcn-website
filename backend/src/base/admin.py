from django.contrib import admin

from .models import Message, Donation, NewsletterSubscriber, NewsletterMessage

admin.site.register(Message)
admin.site.register(Donation)
admin.site.register(NewsletterMessage)
admin.site.register(NewsletterSubscriber)
# Register your models here.
