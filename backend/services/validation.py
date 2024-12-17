def validate_easy_sentence(chosen_cards):
    """
    chosen_cards: list of card dicts, e.g. [ {'word_text':'the','part_of_speech':'Article'}, ...]
    Returns (is_valid, message, score)
    """
    pos_sequence = [card['part_of_speech'] for card in chosen_cards]

    print(f"POS Sequence: {pos_sequence}")

    # Allowed patterns for "Easy Mode"
    allowed_patterns = [
    ['Article', 'Noun', 'Verb'],
    ['Article', 'Adjective', 'Noun', 'Verb'],
    ['Adjective', 'Noun', 'Verb'],
    # ['Article', 'Noun', 'Verb', 'Article', 'Noun'],
    ['Noun', 'Verb']

    ]

    # Check if pos_sequence matches any allowed pattern
    if pos_sequence in allowed_patterns:
        score = len(chosen_cards)  # simple scoring
        return (True, "Sentence is valid!", score)
    else:
        return (False, "Invalid sentence structure.", 0)

import requests
