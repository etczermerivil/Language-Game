import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkEditCard } from "../../redux/cards";
import { useModal } from "../../context/Modal";

function EditCardModal({ card }) {
  const dispatch = useDispatch();
  const [wordText, setWordText] = useState(card.word_text || "");
  const [definition, setDefinition] = useState(card.definition || "");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal(); // Get closeModal from useModal

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      word_text: wordText,
      definition,
    };

    const response = await dispatch(thunkEditCard({ id: card.id, ...updatedData }));

    if (response.errors) {
      setErrors(response.errors);
    } else {
      closeModal(); // Call closeModal properly to close the modal
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Card</h1>
      <input
        type="text"
        value={wordText}
        onChange={(e) => setWordText(e.target.value)}
        required
      />
      {errors.word_text && <p>{errors.word_text}</p>}
      <textarea
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
      />
      {errors.definition && <p>{errors.definition}</p>}
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditCardModal;
