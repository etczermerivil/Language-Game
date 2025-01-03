import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateCard } from "../../redux/cards";
import { useModal } from "../../context/Modal";
import "./CreateCardModal.css";

function CreateCardModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [wordText, setWordText] = useState("");
  const [ipa, setIpa] = useState("");
  const [language, setLanguage] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [lemma, setLemma] = useState("");
  const [definition, setDefinition] = useState("");
  const [errors, setErrors] = useState({});

  // Function to retrieve the CSRF token from cookies
  const getCsrfToken = () => {
    const match = document.cookie.match(/csrf_token=([^;]+)/);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardData = {
      word_text: wordText,
      ipa,
      language,
      part_of_speech: partOfSpeech,
      lemma,
      definition, // Check this value
    };

    console.log("Definition being sent:", definition); // Add this log
    console.log("Card data being sent:", cardData); // Check all data

    const csrfToken = getCsrfToken();

    console.log("Definition:", definition); // Log the state value

    const response = await fetch("/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(cardData),
    });

    if (response.ok) {
      closeModal();
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
      }
      console.error("Failed to create card:", data);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="create-card-modal">
      <h1>Create a New Card</h1>
      <div>
        <input
          type="text"
          placeholder="Word"
          value={wordText}
          onChange={(e) => setWordText(e.target.value)}
          required
        />
        {errors.word_text && <p>{errors.word_text}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="IPA"
          value={ipa}
          onChange={(e) => setIpa(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          required
        />
        {errors.language && <p>{errors.language}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Part of Speech"
          value={partOfSpeech}
          onChange={(e) => setPartOfSpeech(e.target.value)}
          required
        />
        {errors.part_of_speech && <p>{errors.part_of_speech}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Lemma"
          value={lemma}
          onChange={(e) => setLemma(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Definition"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          required
        />
        {errors.definition && <p>{errors.definition}</p>}
      </div>
      <button type="submit">Create Card</button>
    </form>
  );
}

export default CreateCardModal;
