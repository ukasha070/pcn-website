# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('contact/', views.SendMessageView.as_view(), name='contact-us'),
    path('newsletter/subscribe/', views.NewsletterSubscribeView.as_view(),
         name='newsletter-subscribe'),

    path('search/blogs/', views.BlogSearchView.as_view(), name='blog-search'),
    path('search/events/', views.EventSearchView.as_view(), name='event-search'),
    path('search/candidates/', views.CandidateSearchView.as_view(),
         name='candidate-search'),
]
