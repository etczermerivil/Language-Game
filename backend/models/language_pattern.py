from .db import db, environment, SCHEMA, add_prefix_for_prod

class LanguagePattern(db.Model):
    __tablename__ = 'language_patterns'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    language_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("languages.id")), nullable=False)
    position = db.Column(db.Integer, nullable=False)  # Sentence position
    part_of_speech = db.Column(db.String(50), nullable=False)  # Noun, Verb, etc.
    color_code = db.Column(db.String(10), nullable=False)  # Hex color for visual validation

    # Relationships
    language = db.relationship('Language', back_populates='patterns')

    def to_dict(self):
        return {
            'id': self.id,
            'language': self.language.name,
            'position': self.position,
            'part_of_speech': self.part_of_speech,
            'color_code': self.color_code
        }
