from .db import db, environment, SCHEMA, add_prefix_for_prod
from .db import db, deck_cards, environment, SCHEMA, add_prefix_for_prod


class Word(db.Model):
    __tablename__ = 'words'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    word_text = db.Column(db.String(100), nullable=False)
    part_of_speech_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("parts_of_speech.id")), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("languages.id")), nullable=False)
    ipa = db.Column(db.String(100), nullable=True)
    lemma = db.Column(db.String(100), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    card_count = db.Column(db.Integer, nullable=False, default=1)

    # Relationships
    part_of_speech = db.relationship('PartOfSpeech', back_populates='words')
    language = db.relationship('Language', back_populates='words')
    decks = db.relationship("Deck", secondary="deck_cards", back_populates="words")

    def to_dict(self):
        return {
            'id': self.id,
            'word_text': self.word_text,
            'part_of_speech': self.part_of_speech.name,
            'language': self.language.name,
            'ipa': self.ipa,
            'lemma': self.lemma,
            'image_url': self.image_url,
            'card_count': self.card_count
        }
