from django.contrib import admin
from django.urls import path
from .views import HomeView, PDFJapaneseConvert

app_name = 'pdfJapaneseConverter'

urlpatterns = [
    path("", HomeView),
    path("convert/", PDFJapaneseConvert, name='convert'),
]
