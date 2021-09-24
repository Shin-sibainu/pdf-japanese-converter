from logging import error
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render
from pdfminer.high_level import extract_text
from django.core.files.storage import FileSystemStorage

# Create your views here.


def HomeView(request):
    return render(request, "index.html", {})


def translate_text(target_text):
    """Translating Text."""

    from google.cloud import translate

    client = translate.TranslationServiceClient()
    parent = client.location_path("beaming-edition-325211", "global")
    text = target_text

    response = client.translate_text(
        parent=parent,
        contents=[text],
        mime_type="text/plain",
        source_language_code="en-US",
        target_language_code="ja",
    )

    # Display the translation for each input text provided
    for translation in response.translations:
        print("Translated text: {}".format(translation.translated_text))


def PDFJapaneseConvert(request):
    # 翻訳するアルゴリズム
    # 必要なもの：pdfデータ（中身のテキストはライブラリで変換）。translate_textのmodule
    if request.method == "POST" and request.FILES["pdf-file"]:
        pdf_file = request.FILES["pdf-file"]
        fs = FileSystemStorage()
        filename = fs.save(pdf_file.name, pdf_file)
        upload_pdfFile_url = fs.url(filename)  # uploadしたpdfのデータ。
        pdf_data = {
            "upload_pdfFile_url": upload_pdfFile_url
        }
        return JsonResponse(pdf_data)
