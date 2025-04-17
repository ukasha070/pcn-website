from django.shortcuts import get_object_or_404
# views.py
from rest_framework import generics
from rest_framework.exceptions import ValidationError

from .models import BlogPost, Comment

from .serializers import BlogPostSerializer, CommentSerializer

from core.custom_send_email import send_email_message

from django.core.cache import cache


class BlogPostListView(generics.ListAPIView):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        token = cache.get('pesapal_token')
        queryset = BlogPost.objects.filter(is_published=True).only(
            "id", "title", "slug", "description", "thumbnail", "created_at", "author",
        ).order_by('-created_at').distinct()

        search = self.request.query_params.get('q', None)
        search = search.strip() if search else None

        if search and str(search).strip() != '' and search == 'home':
            queryset = queryset[:5]
            return queryset

        return queryset


class BlogPostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'  # or 'pk' if you're using IDs in the URL
    lookup_url_kwarg = 'slug'  # This should match the URL pattern
    # You can add permission classes here if needed


class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        slug = self.kwargs['slug']
        reply_id = self.request.query_params.get('replyID', None)

        blog = get_object_or_404(BlogPost, slug=slug)

        reply_obj = None
        if reply_id:
            reply_obj = get_object_or_404(Comment, id=reply_id)

        if blog.comments.count() >= 50:
            raise ValidationError(
                "The comment section is full. No more comments can be added. (50)")

        if reply_obj:
            # Send an email notification to the person being replied to
            subject = "Prosfyges Comment reply"
            send_email_message(
                to_email=reply_obj.user_email,
                subject=subject,
                recipient_name=reply_obj.full_name,
                body_content=serializer.validated_data.get("comment_msg", ""),
            )

        if reply_obj:
            serializer.save(blog=blog, reply_email=reply_obj.user_email)
        else:
            serializer.save(blog=blog)


class BlogCommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        blog_slug = self.kwargs.get('slug')
        blog = get_object_or_404(BlogPost, slug=blog_slug)
        return Comment.objects.filter(blog=blog).order_by('-created_at')
