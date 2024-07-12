from rest_framework import serializers
from .models import MediaFile, Tag, Actor

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'

class MediaFileSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)
    actors = ActorSerializer(many=True)

    class Meta:
        model = MediaFile
        fields = '__all__'
