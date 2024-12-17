from flask import Blueprint, request, jsonify
from backend.models import db, PartOfSpeech

color_routes = Blueprint('colors', __name__)

# GET all color schemes
@color_routes.route('/colors', methods=['GET'])
def get_all_colors():
    colors = PartOfSpeech.query.all()
    return jsonify([color.to_dict() for color in colors]), 200

# POST: Create a new color scheme
@color_routes.route('/colors', methods=['POST'])
def create_color():
    data = request.get_json()
    new_color = PartOfSpeech(
        name=data['name'],
        color_code=data['color_code']
    )
    db.session.add(new_color)
    db.session.commit()
    return jsonify(new_color.to_dict()), 201

# PUT: Update an existing color scheme
@color_routes.route('/colors/<int:color_id>', methods=['PUT'])
def update_color(color_id):
    color = PartOfSpeech.query.get(color_id)
    if not color:
        return jsonify({'error': 'Color scheme not found'}), 404
    data = request.get_json()
    color.name = data.get('name', color.name)
    color.color_code = data.get('color_code', color.color_code)
    db.session.commit()
    return jsonify(color.to_dict()), 200

# DELETE: Remove a color scheme
@color_routes.route('/colors/<int:color_id>', methods=['DELETE'])
def delete_color(color_id):
    color = PartOfSpeech.query.get(color_id)
    if not color:
        return jsonify({'error': 'Color scheme not found'}), 404
    db.session.delete(color)
    db.session.commit()
    return jsonify({'message': 'Color scheme deleted successfully'}), 200
