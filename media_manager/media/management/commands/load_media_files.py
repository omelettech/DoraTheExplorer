# media/management/commands/load_media_files.py

import os
from django.core.management.base import BaseCommand
from media.models import MediaFile


class Command(BaseCommand):
    help = 'Load media files from a specified directory'

    def add_arguments(self, parser):
        parser.add_argument('directory', type=str, help='Directory to scan for media files')

    def handle(self, *args, **kwargs):
        directory = kwargs['directory']
        media_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov', '.avi')

        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.lower().endswith(media_extensions):
                    file_path = os.path.join(root, file)
                    relative_path = os.path.relpath(file_path, directory)
                    media_name = os.path.basename(file_path)

                    # Check if the media file already exists
                    if not MediaFile.objects.filter(file_path=relative_path).exists():
                        MediaFile.objects.create(
                            name=media_name,
                            file_path=relative_path
                        )
                        self.stdout.write(self.style.SUCCESS(f'Added: {file_path}'))
                    else:
                        self.stdout.write(self.style.WARNING(f'Skipped (already exists): {file_path}'))
