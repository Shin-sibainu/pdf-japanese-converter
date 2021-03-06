from logging import error
from django.http import response
from django.http.response import Http404, HttpResponse, JsonResponse
from django.shortcuts import render
from pdfminer.high_level import extract_text
from django.core.files.storage import FileSystemStorage
import reportlab
from reportlab.pdfbase import pdfmetrics
from .converter import translate_text
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.pdfbase.cidfonts import UnicodeCIDFont

# Create your views here.


def HomeView(request):
    return render(request, "index.html", {})


def upload_file(request):
    try:
        req_file = request.FILES["file"]
        fs = FileSystemStorage()
        filename = fs.save(req_file.name, req_file)
        upload_pdfFile_url = fs.url(filename)  # uploadしたpdfのurl
        en_pdf_text = extract_text("./" + upload_pdfFile_url)

        ja_pdf_text = translate_text(en_pdf_text)  # テキスト翻訳

        # pdf生成
        pdf_instance = canvas.Canvas(
            "./pdfGenerate/sample.pdf")  # 日本語は■で出力されちゃうよ。
        pdfmetrics.registerFont(UnicodeCIDFont('HeiseiKakuGo-W5'))
        pdf_instance.setFont('HeiseiKakuGo-W5', 12)
        pdf_instance.drawString(1 * cm, 27 * cm, ja_pdf_text)
        pdf_instance.showPage()
        pdf_instance.save()

        params = {
            "en_pdf_text": en_pdf_text,
            "ja_pdf_text": ja_pdf_text
        }
        return HttpResponse(render(request, "example.html", params))
    except:
        raise Http404("messages")


""" def PDFJapaneseConvert(request):
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
        return JsonResponse(pdf_data) """
