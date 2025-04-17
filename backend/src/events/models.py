# models.py
from django.db import models
from django.utils.text import slugify

from mdeditor.fields import MDTextField


from blogs.models import Tag


class Event(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    content = MDTextField(default="django")
    tags = models.ManyToManyField(Tag, related_name='events_post')

    location = models.CharField(max_length=255)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    thumbnail = models.ImageField(
        upload_to='event_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    is_done = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(
                f"{self.title}")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Candidate(models.Model):
    event = models.ForeignKey(
        "Event", on_delete=models.CASCADE, related_name="candidates")
    full_name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    photo = models.ImageField(upload_to='candidate_photos/')
    bio = models.TextField(blank=True, null=True)
    vote_count = models.PositiveIntegerField(default=0)
    vote_number = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Prevent duplicate candidate names under the same event
        unique_together = ['event', 'full_name']
        ordering = ['-vote_count']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(
                f"{self.full_name}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.full_name} ({self.event.title})"
