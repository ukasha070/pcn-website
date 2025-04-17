from django.db import models
from django.contrib.auth import get_user_model

from mdeditor.fields import MDTextField

User = get_user_model()


class Tag(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=300)
    description = models.TextField()
    content = MDTextField()
    thumbnail = models.ImageField(upload_to='blog_thumbnails/')
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    tags = models.ManyToManyField(Tag, related_name='blog_posts')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']


class Comment(models.Model):
    blog = models.ForeignKey(
        BlogPost, related_name='comments', on_delete=models.CASCADE)
    full_name = models.CharField(max_length=200)
    user_email = models.EmailField(max_length=200)
    reply_email = models.EmailField(max_length=255, null=True, blank=True)

    comment_msg = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.full_name} on {self.blog.title}'
