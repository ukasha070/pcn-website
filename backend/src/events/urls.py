# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.EventListView.as_view(), name='event-list'),
    path('latest/', views.LatestUpcomingEventAPIView.as_view(), name='latest'),

    path('<slug:slug>/', views.EventDetailView.as_view(), name='event-detail'),

    path('<slug:slug>/candidates/', views.EventCandidatesListView.as_view(),
         name='candidate-detail'),
    path('<slug:event_slug>/candidates/<slug:candidate_slug>/', views.CandidateDetailView.as_view(),
         name='candidate-detail'),
]
