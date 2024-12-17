import os

from flask import Blueprint, request, jsonify
from backend.services.validation import validate_easy_sentence
from backend.services.game_logic import deal_easy_hand, deal_one
from backend.services.grammar_checker import validate_with_language_tool


game_routes = Blueprint('game', __name__)

# Global deck, loaded once
current_directory = os.path.dirname(os.path.abspath(__file__))
csv_filepath = os.path.join(current_directory, '../New_Seed_Data.csv')


# Simple in-memory score for demonstration (per server, not per user)
user_score = 0

@game_routes.route('/deal', methods=['GET'])
def deal_cards():
    global deck
    global user_score

    if len(deck) < 3:
        return jsonify({"error": "Not enough cards to form a sentence. Game over."}), 400

    hand = deal_easy_hand(deck, hand_size=7)
    return jsonify(hand), 200

@game_routes.route('/deal_one', methods=['GET'])
def deal_one_card():
    global deck

    if not deck:
        return jsonify({"error": "No more cards in the deck. Game over."}), 400

    card = deal_one(deck)
    if card is None:
        return jsonify({"error": "No valid cards available in the deck."}), 400

    return jsonify(card), 200

# @game_routes.route('/validate', methods=['POST'])
# def validate_sentence():
#     global user_score
#     data = request.get_json()
#     chosen_cards = data.get('chosenCards', [])

#     is_valid, message, score = validate_easy_sentence(chosen_cards)
#     if is_valid:
#         user_score += score

#     game_over = False
#     if user_score >= 20:
#         game_over = True

#     return jsonify({
#         'valid': is_valid,
#         'message': message,
#         'score': score,
#         'total_score': user_score,
#         'game_over': game_over
#     }), 200

# from backend.services.grammar_checker import validate_with_language_tool



@game_routes.route('/validate', methods=['POST'])
def validate_sentence():
    global user_score
    data = request.get_json()
    chosen_cards = data.get('chosenCards', [])

    # Step 1: Validate structure using the existing function
    is_valid, message, score = validate_easy_sentence(chosen_cards)

    print(f"Structure validation: is_valid={is_valid}, message={message}")

    if not is_valid:
        return jsonify({
            'valid': False,
            'message': message,  # Structural validation failure message
            'score': 0,
            'total_score': user_score,
            'game_over': False
        }), 200

    # Step 2: Construct the sentence for grammar validation
    sentence = ' '.join([card['word_text'] for card in chosen_cards])
    sentence = sentence.capitalize()

    print(f"Sentence sent to LanguageTool: '{sentence}'")

    # Step 3: Validate grammar using LanguageTool API
    grammar_valid, grammar_message, issues = validate_with_language_tool(sentence)
    if not grammar_valid:
        return jsonify({
            'valid': False,
            'message': "Grammar issues detected.",  # General grammar failure message
            'issues': issues,  # Detailed grammar issues from LanguageTool
            'score': 0,
            'total_score': user_score,
            'game_over': False
        }), 200

    # Step 4: Update the score and determine game over status
    user_score += score
    game_over = user_score >= 20

    return jsonify({
        'valid': True,
        'message': "Sentence is valid and grammatically correct!",
        'score': score,
        'total_score': user_score,
        'game_over': game_over
    }), 200
