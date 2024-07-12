from rest_framework import serializers
from .models import MediaFile, Tag, Actor

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ['id', 'name']

class MediaFileSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    actors = ActorSerializer(many=True, read_only=True)

    class Meta:
        model = MediaFile
        fields = ['id', 'name', 'file', 'tags', 'actors', 'date_added', 'is_favorite']
