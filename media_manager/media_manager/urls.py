from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('media.urls')),
    re_path(r'^external_media/(?P<path>.*)$', serve, {
        'document_root': settings.EXTERNAL_MEDIA_ROOT,
    }),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
