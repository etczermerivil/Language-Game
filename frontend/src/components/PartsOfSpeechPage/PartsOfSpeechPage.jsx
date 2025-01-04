import { useState, useEffect } from "react";
import AddEditColorModal from "./AddEditColorModal";
import styles from "./PartsOfSpeechPage.module.css";
import NewParticlesBackground from "../ParticlesBackgroundTwo/ParticlesBackgroundTwo";

const PartsOfSpeechPage = () => {
  const [partsOfSpeech, setPartsOfSpeech] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null); // Tracks the part being edited or null for adding

  useEffect(() => {
    fetch("/api/colors/")
      .then((res) => res.json())
      .then((data) => setPartsOfSpeech(data))
      .catch((err) => console.error(err));
  }, []);

  const openModal = (part) => {
    setSelectedPart(part);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPart(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (updatedPart) => {
    if (selectedPart) {
      // Editing an existing part
      setPartsOfSpeech((prevParts) =>
        prevParts.map((part) =>
          part.id === updatedPart.id ? updatedPart : part
        )
      );
    } else {
      // Adding a new part
      setPartsOfSpeech((prevParts) => [...prevParts, updatedPart]);
    }
    closeModal();
  };

  const handleDelete = (colorId) => {
    fetch(`/api/colors/${colorId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete color");
        }
        return res.json();
      })
      .then(() => {
        // Remove the deleted color from the state
        setPartsOfSpeech((prevParts) =>
          prevParts.filter((part) => part.id !== colorId)
        );
        closeModal(); // Close the modal after deletion
      })
      .catch((err) => {
        console.error("Failed to delete color:", err);
      });
  };



  return (
    <div className={styles.container}>

      <div className={styles.particlesBackground}>
        <NewParticlesBackground />
      </div>

    {/* Left Section: Title */}
    <div className={styles.titleBox}>

        <h1 className={styles.title}>Parts Of Speech</h1>
      </div>

      {/* Right Section: Parts of Speech */}
      <div className={styles.partsBox}>
        <div className={styles.partsGrid}>
          {partsOfSpeech.map((part) => (
            <div
              key={part.id}
              className={styles.partContainer}
              onClick={() => openModal(part)} // Makes the circle clickable
            >
              <div
                className={styles.partBox}
                style={{ backgroundColor: part.color_code }}
              >
                {part.name}
              </div>
            </div>
          ))}

          {/* Add New Part of Speech Button */}
          <div className={styles.partContainer}>
            <button
              className={styles.addCircleButton}
              onClick={() => openModal(null)} // Opens the modal for adding a new part
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Adding, Editing, or Deleting */}
      {isModalOpen && (
        <AddEditColorModal
          part={selectedPart}
          onSubmit={handleSubmit}
          onClose={closeModal}
          onDelete={handleDelete} // Pass handleDelete as a prop to the modal
        />
      )}
    </div>
  );

};

export default PartsOfSpeechPage;
