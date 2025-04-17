from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView


from django.conf import settings
from django.conf.urls.static import static

from .views import index_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.urls')),
    path('api/blogs/', include('blogs.urls')),
    path('api/events/', include('events.urls')),
    path('api/payments/', include('payments.urls')),

    path('', index_view, name="index-view"),
    re_path(
        r'^(?!api/|admin/|static/|assets/|media/).*$',
        TemplateView.as_view(template_name='index.html')),

    path(r'mdeditor/', include('mdeditor.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATICFILES_DIRS)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
