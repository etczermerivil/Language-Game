import random

def deal_easy_hand(deck, hand_size=7):
    """
    deck: a list of card dicts, e.g. global or user-specific deck
    hand_size: number of cards to deal
    This function removes cards from 'deck' as it deals them.
    """

    # Filter out the POS categories for easy mode
    articles = [card for card in deck if card['part_of_speech'] == 'Article']
    nouns = [card for card in deck if card['part_of_speech'] == 'Noun']
    verbs = [card for card in deck if card['part_of_speech'] == 'Verb']
    adjectives = [card for card in deck if card['part_of_speech'] == 'Adjective']

    hand = []

    # Always pick at least 1 article, 1 noun, 1 verb if possible
    if articles:
        card = random.choice(articles)
        hand.append(card)
        deck.remove(card)

    if nouns:
        card = random.choice(nouns)
        hand.append(card)
        deck.remove(card)

    if verbs:
        card = random.choice(verbs)
        hand.append(card)
        deck.remove(card)

    # Combine what's left of these easy-mode categories
    easy_mode_pool = [c for c in deck if c['part_of_speech'] in ['Article','Noun','Verb','Adjective']]

    while len(hand) < hand_size and easy_mode_pool:
        random_card = random.choice(easy_mode_pool)
        hand.append(random_card)
        deck.remove(random_card)  # remove from the main deck

        # rebuild easy_mode_pool or remove from easy_mode_pool each iteration
        easy_mode_pool.remove(random_card)

    return hand

import random



def deal_one(deck):
    """
    Draws a single card from the deck, prioritizing easy-mode parts of speech.
    deck: a list of card dicts, e.g. global or user-specific deck.
    Returns the drawn card or None if the deck is empty.
    """
    # Filter out the POS categories for easy mode
    easy_mode_pool = [card for card in deck if card['part_of_speech'] in ['Article', 'Noun', 'Verb', 'Adjective']]

    if not easy_mode_pool:
        # No more valid cards to draw
        return None

    # Randomly choose one card from the easy mode pool
    card = random.choice(easy_mode_pool)

    # Remove the selected card from the deck
    deck.remove(card)

    return card
