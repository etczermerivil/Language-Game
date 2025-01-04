import { useState, useEffect } from 'react';
import styles from './PartsOfSpeechPage.module.css';



// import AddEditColorModal from './AddEditColorModal';
// import DeleteColorModal from './DeleteColorModal';
// import ParticlesBackground from "../ParticlesBackground/ParticlesBackground";
// import { useModal } from "../../context/Modal";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const PartsOfSpeechPage = () => {
    const [partsOfSpeech, setPartsOfSpeech] = useState([]);

    useEffect(() => {
      fetch('/api/colors/')
        .then((res) => res.json())
        .then((data) => setPartsOfSpeech(data))
        .catch((err) => console.error(err));
    }, []);

    return (
<div className={styles.container}>
  {/* Left Section: Title */}
  <div className={styles.titleBox}>
    <h1 className={styles.title}>Parts Of Speech</h1>
  </div>

  {/* Right Section: Parts of Speech */}
  <div className={styles.partsBox}>
    <div className={styles.partsGrid}>
      {partsOfSpeech.map((part) => (
        <div key={part.id} className={styles.partContainer}>
          <div
            className={styles.partBox}
            style={{ backgroundColor: part.color_code }}
          >
            {part.name}
          </div>
          <div className={styles.buttonGroup}>
          <button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => console.log('Edit:', part.id)}
                >
                ✏️
                </button>
                <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => console.log('Delete:', part.id)}
                >
                ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


    );
  };

  export default PartsOfSpeechPage;
