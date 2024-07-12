# media/management/commands/delete_media_files.py

from django.core.management.base import BaseCommand
from media.models import MediaFile

class Command(BaseCommand):
    help = 'Delete all media files from the database'

    def handle(self, *args, **kwargs):
        MediaFile.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('All media files deleted from the database'))
