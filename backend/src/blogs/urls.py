from django.urls import path
from .views import BlogPostListView, BlogPostDetailView, BlogCommentListView, CommentCreateView

urlpatterns = [
    path('', BlogPostListView.as_view(), name='blog-list'),
    path('<slug:slug>/', BlogPostDetailView.as_view(), name='blog-detail'),
    # comment
    path('<slug:slug>/comments/create/',
         CommentCreateView.as_view(), name='comment-create'),
    path('<slug:slug>/comments/',
         BlogCommentListView.as_view(), name='blog-comments'),
]
