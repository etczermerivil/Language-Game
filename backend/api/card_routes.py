from flask import Blueprint, request, jsonify
from backend.models import db, Word, PartOfSpeech, Language

card_routes = Blueprint('cards', __name__)

# GET all cards
@card_routes.route('/', methods=['GET'])
def get_all_cards():
    cards = Word.query.all()
    return jsonify([card.to_dict() for card in cards]), 200

# GET a single card by ID
@card_routes.route('/<int:card_id>', methods=['GET'])
def get_card(card_id):
    card = Word.query.get(card_id)
    if not card:
        return jsonify({'error': 'Card not found'}), 404
    return jsonify(card.to_dict()), 200


# POST: Create a new card
@card_routes.route('/', methods=['POST'])
def create_card():
    """
    Create a new card
    """
    data = request.get_json()
    try:
        # Fetch the related PartOfSpeech and Language by name
        part_of_speech = PartOfSpeech.query.filter_by(name=data["part_of_speech"]).first()
        language = Language.query.filter_by(name=data["language"]).first()

        if not part_of_speech:
            return jsonify({"error": f"Part of Speech '{data['part_of_speech']}' not found"}), 400
        if not language:
            return jsonify({"error": f"Language '{data['language']}' not found"}), 400

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
def delete_card(card_id):
    card = Word.query.get(card_id)
    if not card:
        return jsonify({'error': 'Card not found'}), 404
    db.session.delete(card)
    db.session.commit()
    return jsonify({'message': 'Card deleted successfully'}), 200
