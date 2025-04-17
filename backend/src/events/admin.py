from django.contrib import admin

# Register your models here.
from .models import Event, Candidate


admin.site.register(Event)
admin.site.register(Candidate)
