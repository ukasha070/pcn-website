from django.urls import path
from . import views

urlpatterns = [
    path('initialise-vote/', views.PaymentCreateView.as_view(),
         name='payment-create'),
    path('callback/', views.PaymentCallback.as_view(), name='payment-create')
]
