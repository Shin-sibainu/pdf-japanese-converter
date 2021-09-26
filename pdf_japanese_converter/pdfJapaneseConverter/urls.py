from django.contrib import admin
from django.urls import path
from .views import HomeView, upload_file
from django.conf import settings
from django.conf.urls.static import static

app_name = 'pdfJapaneseConverter'

urlpatterns = [
    path("", HomeView),
    path("upload_file", upload_file, name="upload_file")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
