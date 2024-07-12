from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MediaFileViewSet, TagViewSet, ActorViewSet

router = DefaultRouter()
router.register(r'mediafiles', MediaFileViewSet)
router.register(r'tags', TagViewSet)
router.register(r'actors', ActorViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
