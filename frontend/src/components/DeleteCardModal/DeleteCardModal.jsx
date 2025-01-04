import { useDispatch } from "react-redux";
import { thunkDeleteCard } from "../../redux/cards";
import { useModal } from "../../context/Modal";
import styles from "./DeleteCardModal.module.css"; // Import the CSS module

function DeleteCardModal({ cardId, cardName }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    const errors = await dispatch(thunkDeleteCard(cardId));

    if (errors) {
      alert("Failed to delete card. Please try again.");
    } else {
      closeModal();
    }
  };

  return (
    <div id="delete-modal" className={styles.modalContainer}>
      <h2 className={styles.modalTitle}>Delete Card</h2>
      <p className={styles.modalText}>
        Are you sure you want to delete the card{" "}
        <span className={styles.cardName}>&quot;{cardName}&quot;</span>
      </p>
      <div className={styles.buttonGroup}>
        <button className={styles.cancelButton} onClick={closeModal}>
          Cancel
        </button>
        <button className={styles.confirmButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteCardModal;
