
import { useState } from 'react';

// import './AddEditColorModal.module.css';

const AddEditColorModal = ({ part, onSubmit, onClose }) => {
  const [name, setName] = useState(part ? part.name : '');
  const [colorCode, setColorCode] = useState(part ? part.color_code : '');

  const handleSubmit = () => {
    const updatedPart = { ...part, name, color_code: colorCode };
    fetch(`/api/colors/${part ? part.id : ''}`, {
      method: part ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPart),
    })
      .then((res) => res.json())
      .then((data) => {
        onSubmit(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="modal">
      <h2>{part ? 'Edit Part of Speech' : 'Add Part of Speech'}</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="color"
        value={colorCode}
        onChange={(e) => setColorCode(e.target.value)}
      />
      <button onClick={handleSubmit}>{part ? 'Save Changes' : 'Add'}</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddEditColorModal;
