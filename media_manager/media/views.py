# media/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import MediaFile, Tag, Actor
from .serializers import MediaFileSerializer, TagSerializer, ActorSerializer

class MediaFileViewSet(viewsets.ModelViewSet):
    queryset = MediaFile.objects.all()
    serializer_class = MediaFileSerializer

    @action(detail=True, methods=['post'])
    def add_tag(self, request, pk=None):
        media_file = self.get_object()
        tag_name = request.data.get('name')
        tag, created = Tag.objects.get_or_create(name=tag_name)
        media_file.tags.add(tag)
        return Response({'status': 'tag added'})

    @action(detail=True, methods=['post'])
    def remove_tag(self, request, pk=None):
        media_file = self.get_object()
        tag_name = request.data.get('name')
        tag = Tag.objects.get(name=tag_name)
        media_file.tags.remove(tag)
        return Response({'status': 'tag removed'})

    @action(detail=True, methods=['post'])
    def add_actor(self, request, pk=None):
        media_file = self.get_object()
        actor_name = request.data.get('name')
        actor, created = Actor.objects.get_or_create(name=actor_name)
        media_file.actors.add(actor)
        return Response({'status': 'actor added'})

    @action(detail=True, methods=['post'])
    def remove_actor(self, request, pk=None):
        media_file = self.get_object()
        actor_name = request.data.get('name')
        actor = Actor.objects.get(name=actor_name)
        media_file.actors.remove(actor)
        return Response({'status': 'actor removed'})
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class ActorViewSet(viewsets.ModelViewSet):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
