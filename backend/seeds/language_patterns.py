from backend.models import db, LanguagePattern

def seed_language_patterns():
    # Assuming English (language_id=1)
    pattern1 = LanguagePattern(language_id=1, position=1, part_of_speech="Noun", color_code="#1E90FF")
    pattern2 = LanguagePattern(language_id=1, position=2, part_of_speech="Verb", color_code="#FF0000")

    db.session.add_all([pattern1, pattern2])
    db.session.commit()
    print("Language Patterns seeded successfully.")

def undo_language_patterns():
    db.session.execute("DELETE FROM language_patterns;")
    db.session.commit()
    print("Language Patterns cleared.")
