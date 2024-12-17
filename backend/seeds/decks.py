from backend.models import db, Deck, Word, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_decks():
    # Fetch an existing user
    user = User.query.first()
    if not user:
        print("No users available to seed decks. Run user seeds first.")
        return

    # Fetch words for association
    words = Word.query.all()
    if not words:
        print("No words available to seed decks. Run word seeds first.")
        return

    # Create example decks and associate words
    deck1 = Deck(name="Starter Deck", user_id=user.id)
    deck2 = Deck(name="Advanced Deck", user_id=user.id)

    deck1.words.extend(words[:5])  # Associate first 5 words with Starter Deck
    deck2.words.extend(words[5:10])  # Associate next 5 words with Advanced Deck

    db.session.add(deck1)
    db.session.add(deck2)
    db.session.commit()

    print("Decks seeded successfully.")

def undo_decks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.decks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM decks"))

    db.session.commit()
    print("Decks cleared successfully.")
