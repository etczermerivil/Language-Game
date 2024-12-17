from flask import Blueprint, request, jsonify
from backend.models import db, Deck

deck_routes = Blueprint('decks', __name__)

# GET all decks
@deck_routes.route('/decks', methods=['GET'])
def get_all_decks():
    decks = Deck.query.all()
    return jsonify([deck.to_dict() for deck in decks]), 200

# GET a single deck by ID
@deck_routes.route('/decks/<int:deck_id>', methods=['GET'])
def get_deck(deck_id):
    deck = Deck.query.get(deck_id)
    if not deck:
        return jsonify({'error': 'Deck not found'}), 404
    return jsonify(deck.to_dict()), 200

# POST: Create a new deck
@deck_routes.route('/decks', methods=['POST'])
def create_deck():
    data = request.get_json()
    new_deck = Deck(
        name=data['name'],
        user_id=data['user_id']
    )
    db.session.add(new_deck)
    db.session.commit()
    return jsonify(new_deck.to_dict()), 201

# PUT: Update an existing deck
@deck_routes.route('/decks/<int:deck_id>', methods=['PUT'])
def update_deck(deck_id):
    deck = Deck.query.get(deck_id)
    if not deck:
        return jsonify({'error': 'Deck not found'}), 404
    data = request.get_json()
    deck.name = data.get('name', deck.name)
    db.session.commit()
    return jsonify(deck.to_dict()), 200

# DELETE: Remove a deck
@deck_routes.route('/decks/<int:deck_id>', methods=['DELETE'])
def delete_deck(deck_id):
    deck = Deck.query.get(deck_id)
    if not deck:
        return jsonify({'error': 'Deck not found'}), 404
    db.session.delete(deck)
    db.session.commit()
    return jsonify({'message': 'Deck deleted successfully'}), 200
