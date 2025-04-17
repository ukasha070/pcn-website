from django.contrib import admin
from django.urls import path, include

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

    path(r'mdeditor/', include('mdeditor.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATICFILES_DIRS)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
