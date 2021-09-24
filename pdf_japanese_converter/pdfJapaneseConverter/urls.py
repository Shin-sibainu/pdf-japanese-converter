from django.contrib import admin
from django.urls import path
from .views import HomeView, PDFJapaneseConvert
from django.conf import settings
from django.conf.urls.static import static

app_name = 'pdfJapaneseConverter'

urlpatterns = [
    path("", HomeView),
    path("convert/", PDFJapaneseConvert, name='convert'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
