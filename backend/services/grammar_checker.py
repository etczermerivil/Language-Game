import requests

def validate_with_language_tool(sentence, language='en'):
    """
    Validate a sentence using LanguageTool API.

    :param sentence: The sentence to validate (string).
    :param language: The language code (e.g., 'en' for English, 'es' for Spanish).
    :return: (is_valid: bool, message: str, issues: list)
    """
    url = "https://api.languagetool.org/v2/check"
    payload = {
        'text': sentence,
        'language': language
    }

    try:
        response = requests.post(url, data=payload)
        if response.status_code == 200:
            result = response.json()
            matches = result.get('matches', [])
            if matches:
                # Issues detected
                return False, "Grammar issues found.", matches
            else:
                # No issues
                return True, "Sentence is grammatically correct.", []
        else:
            # API Error
            return False, f"Error from LanguageTool API: {response.status_code}", []
    except Exception as e:
        # Handle any exceptions
        return False, f"Exception occurred: {str(e)}", []
