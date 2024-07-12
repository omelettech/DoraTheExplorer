from django.db import models

class Actor(models.Model):
    name = models.CharField(max_length=255)

class Tag(models.Model):
    name = models.CharField(max_length=255)

class MediaFile(models.Model):
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='media/')
    tags = models.ManyToManyField(Tag, related_name='media_files')
    actors = models.ManyToManyField(Actor, related_name='media_files')
    date_added = models.DateTimeField(auto_now_add=True)
    is_favorite = models.BooleanField(default=False)

    def __str__(self):
        return self.name
