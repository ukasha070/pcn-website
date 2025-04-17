# serializers.py
from django.conf import settings
from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework import serializers
import markdown

from .models import BlogPost, Tag, Comment


User = get_user_model()


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = '__all__'


class AuthorSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'profile_picture']

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username

    def get_profile_picture(self, obj):
        profile = getattr(obj, 'profile', None)
        if profile and profile.profile_picture:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(profile.profile_picture.url)
            else:
                return f"{settings.MEDIA_URL}{profile.profile_picture.url}"
        return None


class BlogPostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    tags = TagSerializer(read_only=True, many=True)
    href = serializers.HyperlinkedIdentityField(
        view_name='blog-detail',
        lookup_field='slug',
        read_only=True
    )
    content_html = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        exclude = ['content']

    def get_content_html(self, obj):
        return markdown.markdown(obj.content)


class CommentSerializer(serializers.ModelSerializer):
    blog = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'blog', 'full_name',
                  'comment_msg', 'user_email', 'created_at']

    def get_blog(self, obj):
        return obj.blog.id
