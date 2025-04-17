# views.py
from rest_framework import status
from rest_framework import generics
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from .models import Event
from .models import Candidate

from .serializers import EventSerializer
from .serializers import CandidateSerializer


class EventListView(generics.ListAPIView):
    queryset = Event.objects.filter(is_published=True).only(
        "id", "title", "slug", "start_datetime", "end_datetime", "location"
    ).order_by("-start_datetime")  # optimize for fast listing
    serializer_class = EventSerializer


class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.filter(is_published=True)
    serializer_class = EventSerializer
    lookup_field = 'slug'  # or 'pk' if you prefer


class EventCandidatesListView(generics.ListAPIView):
    serializer_class = CandidateSerializer
    pagination_class = None

    def get_queryset(self):
        slug = self.kwargs.get('slug')
        try:
            event = Event.objects.get(slug=slug)
        except Event.DoesNotExist:
            raise NotFound(detail="Event not found.")
        return Candidate.objects.filter(event=event)


class CandidateDetailView(generics.RetrieveAPIView):
    serializer_class = CandidateSerializer

    def get_object(self):
        event_slug = self.kwargs.get('event_slug')
        candidate_slug = self.kwargs.get('candidate_slug')

        try:
            event = Event.objects.get(slug=event_slug)
        except Event.DoesNotExist:
            raise NotFound(detail="Event not found.")

        try:
            candidate = Candidate.objects.get(slug=candidate_slug, event=event)
        except Candidate.DoesNotExist:
            raise NotFound(detail="Candidate not found for this event.")

        return candidate


class LatestUpcomingEventAPIView(generics.RetrieveAPIView):
    serializer_class = EventSerializer

    def get_object(self):
        try:
            return Event.objects.filter(is_done=False, is_published=True).latest('start_datetime')
        except Event.DoesNotExist:
            raise NotFound("No upcoming events found.")
