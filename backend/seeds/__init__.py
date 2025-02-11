from flask.cli import AppGroup
from .users import seed_users, undo_users
from .languages import seed_languages, undo_languages
from .parts_of_speech import seed_parts_of_speech, undo_parts_of_speech
from .language_patterns import seed_language_patterns, undo_language_patterns
from .seed_data import seed_words, undo_words
from .decks import seed_decks, undo_decks
from backend.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
seed_commands = AppGroup('seed')


# Creates the `flask seed all` commandå
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo()
    seed_users()
    seed_languages()
    seed_parts_of_speech()
    seed_language_patterns()
    seed_words()
    seed_decks()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_decks()
    undo_words()
    undo_language_patterns()
    undo_parts_of_speech()
    undo_languages()
    undo_users()
    print("All tables cleared successfully.")
