import { useState, useEffect } from 'react';
import AddEditColorModal from './AddEditColorModal';
import DeleteColorModal from './DeleteColorModal';
// import './PartsOfSpeechPage.module.css';
// import ParticlesBackground from "../ParticlesBackground/ParticlesBackground";
// import { useModal } from "../../context/Modal";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';





const PartsOfSpeechPage = () => {
  const [partsOfSpeech, setPartsOfSpeech] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  useEffect(() => {
    fetch('/api/colors/')
      .then((res) => res.json())
      .then((data) => setPartsOfSpeech(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddEditClick = (part = null) => {
    setSelectedPart(part);
    setShowAddEditModal(true);
  };

  const handleDeleteClick = (part) => {
    setSelectedPart(part);
    setShowDeleteModal(true);
  };

  const handleAddEditSubmit = (updatedPart) => {
    if (selectedPart) {
      setPartsOfSpeech((prev) =>
        prev.map((p) => (p.id === updatedPart.id ? updatedPart : p))
      );
    } else {
      setPartsOfSpeech((prev) => [...prev, updatedPart]);
    }
    setShowAddEditModal(false);
  };

  const handleDeleteSubmit = (deletedId) => {
    setPartsOfSpeech((prev) => prev.filter((p) => p.id !== deletedId));
    setShowDeleteModal(false);
  };

  return (
    <div className="parts-page">
      <h1>Parts of Speech & Colors</h1>
      <div className="parts-grid">
        {partsOfSpeech.map((part) => (
          <div key={part.id} className="part-card">
            <div
              className="color-swatch"
              style={{ backgroundColor: part.color_code }}
            ></div>
            <h3>{part.name}</h3>
            <button onClick={() => handleAddEditClick(part)}>Edit</button>
            <button onClick={() => handleDeleteClick(part)}>Delete</button>
          </div>
        ))}
      </div>
      <button
        className="add-button"
        onClick={() => handleAddEditClick(null)}
      >
        Add
      </button>
      {showAddEditModal && (
        <AddEditColorModal
          part={selectedPart}
          onSubmit={handleAddEditSubmit}
          onClose={() => setShowAddEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteColorModal
          part={selectedPart}
          onSubmit={handleDeleteSubmit}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default PartsOfSpeechPage;
