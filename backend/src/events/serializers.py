# serializers.py
from rest_framework import serializers

from .models import Event
from .models import Candidate

import markdown
# serializers.py

from blogs.serializers import TagSerializer


class CandidateSerializer(serializers.ModelSerializer):
    event_slug = serializers.SerializerMethodField()

    class Meta:
        model = Candidate
        fields = [
            'id',  # assuming you want the primary key included
            'event',
            'full_name',
            'slug',
            'photo',
            'bio',
            'vote_count',
            'vote_number',
            'created_at',
            "event_slug"
        ]

        read_only_fields = ['id', 'vote_count', 'created_at', ]

    def get_event_slug(self, obj):
        return str(obj.event.slug)


class EventSerializer(serializers.ModelSerializer):
    candidates = CandidateSerializer(many=True, read_only=True)
    tags = TagSerializer(read_only=True, many=True)
    content_html = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'slug', 'description', 'content_html', 'tags',
            'location', 'start_datetime', 'end_datetime', 'thumbnail', 'created_at', 'updated_at', 'is_published', 'candidates'
        ]
        read_only_fields = ('slug', 'created_at', 'updated_at')

    def get_content_html(self, obj):
        return markdown.markdown(obj.content)
