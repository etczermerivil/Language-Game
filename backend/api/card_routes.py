from flask import Blueprint, request, jsonify
from backend.models import db,  Word, PartOfSpeech, Language
from flask_login import login_required

card_routes = Blueprint('cards', __name__)

# GET all cards
@card_routes.route('/', methods=['GET'])
def get_all_cards():
    cards = Word.query.all()
    if cards:
        return jsonify([card.to_dict() for card in cards]), 200
    else:
        return jsonify([]), 200


# @card_routes.route('/', methods=['GET'])
# def get_all_cards():
#     cards = Word.query.all()  # Fetch all cards
#     if cards:
#         return jsonify([card.to_dict() for card in cards]), 200
#     else:
#         return jsonify([]), 200


# GET a single card by ID
@card_routes.route('/<int:card_id>', methods=['GET'])
def get_card(card_id):
    card = Word.query.get(card_id)
    if not card:
        return jsonify({'error': 'Card not found'}), 404
    return jsonify(card.to_dict()), 200


@card_routes.route('/', methods=['POST'])
@login_required

def create_card():
    """
    Create a new card
    """
    data = request.get_json()

    # Check if required fields are missing
    if not data.get("word_text"):
        return jsonify({"error": "Missing required field: word_text"}), 400
    if not data.get("part_of_speech"):
        return jsonify({"error": "Missing required field: part_of_speech"}), 400
    if not data.get("language"):
        return jsonify({"error": "Missing required field: language"}), 400

    card_count = data.get("card_count")
    if card_count is not None:
        if not isinstance(card_count, int) or card_count <= 0:
            return jsonify({"error": "Invalid card_count: must be a positive integer."}), 400

    try:
        # Fetch the related PartOfSpeech by name
        part_of_speech = PartOfSpeech.query.filter_by(name=data["part_of_speech"]).first()

        # Check if PartOfSpeech exists
        if not part_of_speech:
            return jsonify({"error": f"Part of Speech '{data['part_of_speech']}' not found"}), 400

        # Fetch the related Language by name
        language = Language.query.filter_by(name=data["language"]).first()

        # Check if Language exists
        if not language:
            return jsonify({"error": f"Language '{data['language']}' not found"}), 400

        # Check if the card already exists with the same word_text and language_id
        existing_card = Word.query.filter_by(word_text=data["word_text"], language_id=language.id).first()
        if existing_card:
            return jsonify({"error": "Card with this word_text and language already exists"}), 409

        # Create the Word instance using IDs for foreign keys
        new_card = Word(
            word_text=data["word_text"],
            ipa=data.get("ipa"),
            part_of_speech_id=part_of_speech.id,
            language_id=language.id,
            lemma=data.get("lemma"),
            image_url=data.get("image_url"),
            card_count=data.get("card_count", 1)  # Default to 1 if not provided
        )

        db.session.add(new_card)
        db.session.commit()
        return jsonify(new_card.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        print("Error:", e)
        return jsonify({"error": str(e)}), 400


# PUT: Update an existing card
@card_routes.route('/<int:card_id>', methods=['PUT'])
@login_required

def update_card(card_id):
    card = Word.query.get(card_id)
    if not card:
        return jsonify({'error': 'Card not found'}), 404

    data = request.get_json()

    # Update the correct fields
    card.word_text = data.get('word_text', card.word_text)
    card.ipa = data.get('ipa', card.ipa)
    card.language_id = data.get('language_id', card.language_id)
    card.part_of_speech_id = data.get('part_of_speech_id', card.part_of_speech_id)
    card.lemma = data.get('lemma', card.lemma)
    card.image_url = data.get('image_url', card.image_url)
    card.card_count = data.get('card_count', card.card_count)

    db.session.commit()
    return jsonify(card.to_dict()), 200


# DELETE: Remove a card
@card_routes.route('/<int:card_id>', methods=['DELETE'])
@login_required

def delete_card(card_id):
    card = Word.query.get(card_id)
    if not card:
        return jsonify({'error': 'Card not found'}), 404
    db.session.delete(card)
    db.session.commit()
    return jsonify({'message': 'Card deleted successfully'}), 200
