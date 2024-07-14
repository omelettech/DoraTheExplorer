import os
from functools import reduce
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.conf import settings
from django.shortcuts import get_object_or_404
from .models import MediaFile, Tag, Actor
from .serializers import MediaFileSerializer, TagSerializer, ActorSerializer

class MediaFileViewSet(viewsets.ModelViewSet):
    queryset = MediaFile.objects.all()
    serializer_class = MediaFileSerializer

    # GET method to retrieve a single MediaFile by ID
    def retrieve(self, request, pk=None):
        queryset = MediaFile.objects.all()
        media_file = get_object_or_404(queryset, pk=pk)
        serializer = MediaFileSerializer(media_file)
        return Response(serializer.data)

    # Custom action to fetch directory structure of external media root
    @action(detail=False)
    def directory_structure(self, request):
        root_directory = settings.EXTERNAL_MEDIA_ROOT
        directory_structure = self.get_directory_structure(root_directory)
        return Response(directory_structure)

    # Utility function to create a directory structure representation
    def get_directory_structure(self, rootdir):
        dir_structure = {}
        rootdir = rootdir.rstrip(os.sep)
        start = rootdir.rfind(os.sep) + 1

        for path, dirs, files in os.walk(rootdir):
            folders = path[start:].split(os.sep)
            subdir = {}
            parent = reduce(dict.get, folders[:-1], dir_structure)

            for file_name in files:
                file_path = os.path.relpath(os.path.join(path, file_name), rootdir)
                try:
                    file_model_instance = MediaFile.objects.get(file=file_path)
                    subdir[file_name] = file_model_instance.id
                except MediaFile.DoesNotExist:
                    subdir[file_name] = None

            parent[folders[-1]] = subdir

        return dir_structure[rootdir.split(os.sep)[-1]]

    def update(self, request, pk=None):
        media_file = self.get_object()
        media_file.is_favorite = not media_file.is_favorite  # Toggle is_favorite
        media_file.save()
        return Response({'status': f'is_favorite toggled to {media_file.is_favorite}'})

    # Action to add a tag to a specific MediaFile instance
    @action(detail=True, methods=['post'])
    def add_tag(self, request, pk=None):
        media_file = self.get_object()
        tag_name = request.data.get('name')
        if tag_name:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            media_file.tags.add(tag)
            return Response({'status': 'tag added'})
        else:
            return Response({'status': 'Tag name not provided'}, status=400)

    # Action to remove a tag from a specific MediaFile instance
    @action(detail=True, methods=['post'])
    def remove_tag(self, request, pk=None):
        media_file = self.get_object()
        tag_name = request.data.get('name')
        if tag_name:
            tag = get_object_or_404(Tag, name=tag_name)
            media_file.tags.remove(tag)
            return Response({'status': 'tag removed'})
        else:
            return Response({'status': 'Tag name not provided'}, status=400)

    # Action to add an actor to a specific MediaFile instance
    @action(detail=True, methods=['post'])
    def add_actor(self, request, pk=None):
        media_file = self.get_object()
        actor_name = request.data.get('name')
        if actor_name:
            actor, created = Actor.objects.get_or_create(name=actor_name)
            media_file.actors.add(actor)
            return Response({'status': 'actor added'})
        else:
            return Response({'status': 'Actor name not provided'}, status=400)

    # Action to remove an actor from a specific MediaFile instance
    @action(detail=True, methods=['post'])
    def remove_actor(self, request, pk=None):
        media_file = self.get_object()
        actor_name = request.data.get('name')
        if actor_name:
            actor = get_object_or_404(Actor, name=actor_name)
            media_file.actors.remove(actor)
            return Response({'status': 'actor removed'})
        else:
            return Response({'status': 'Actor name not provided'}, status=400)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class ActorViewSet(viewsets.ModelViewSet):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
