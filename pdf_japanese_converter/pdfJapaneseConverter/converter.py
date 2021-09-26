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
        translate_text = translation.translated_text

    return translate_text
