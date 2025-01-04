import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkEditCard } from "../../redux/cards";
import { useModal } from "../../context/Modal";
import styles from "./EditCardModal.module.css"; // Import the CSS module

function EditCardModal({ card, updateCard }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  // State for each editable field
  const [wordText, setWordText] = useState(card.word_text || "");
  const [pronunciation, setPronunciation] = useState(card.pronunciation || "");
  const [partOfSpeech, setPartOfSpeech] = useState(card.part_of_speech || "");
  const [definition, setDefinition] = useState(card.definition || "");
  const [exampleSentence, setExampleSentence] = useState(card.example_sentence || "");
  const [exampleTranslation, setExampleTranslation] = useState(card.example_translation || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      word_text: wordText,
      pronunciation,
      part_of_speech: partOfSpeech,
      definition,
      example_sentence: exampleSentence,
      example_translation: exampleTranslation,
    };

    const response = await dispatch(thunkEditCard({ id: card.id, ...updatedData }));

    if (response.errors) {
      setErrors(response.errors); // Handle errors from the backend
    } else {
      updateCard(response); // Update local state in the CardsPage
      closeModal(); // Close modal after successful submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h1 className={styles.heading}>Edit Card</h1>

      {/* Word */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Word:</label>
        <input
          type="text"
          value={wordText}
          onChange={(e) => setWordText(e.target.value)}
          className={styles.inputField}
          required
        />
        {errors.word_text && <p className={styles.errorText}>{errors.word_text}</p>}
      </div>

      {/* Pronunciation */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Pronunciation:</label>
        <input
          type="text"
          value={pronunciation}
          onChange={(e) => setPronunciation(e.target.value)}
          className={styles.inputField}
        />
      </div>

      {/* Part of Speech */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Part of Speech:</label>
        <input
          type="text"
          value={partOfSpeech}
          onChange={(e) => setPartOfSpeech(e.target.value)}
          className={styles.inputField}
          required
        />
      </div>

      {/* Definition */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Definition:</label>
        <textarea
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          className={styles.textareaField}
          required
        />
        {errors.definition && <p className={styles.errorText}>{errors.definition}</p>}
      </div>

      {/* Example Sentence */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Example Sentence:</label>
        <textarea
          value={exampleSentence}
          onChange={(e) => setExampleSentence(e.target.value)}
          className={styles.textareaField}
        />
      </div>

      {/* Example Translation */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>Example Translation:</label>
        <textarea
          value={exampleTranslation}
          onChange={(e) => setExampleTranslation(e.target.value)}
          className={styles.textareaField}
        />
      </div>

      <button type="submit" className={styles.submitButton}>Save Changes</button>
    </form>
  );
}

export default EditCardModal;
