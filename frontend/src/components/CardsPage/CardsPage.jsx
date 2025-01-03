


// CardsPage.jsx
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { useModal } from "../../context/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";


import ParticlesBackground from "../ParticlesBackground/ParticlesBackground";

import CreateCardModal from "../CreateCardModal/CreateCardModal";
import EditCardModal from "../EditCardModal/EditCardModal"; // Ensure the correct path

import styles from './styles.module.css';


const partOfSpeechColors = {
  Noun: 'linear-gradient(225deg, #0066FF, #1F78FF)',
  Verb: 'linear-gradient(225deg, #FF0000, #FF5000)',
  Adjective: 'linear-gradient(225deg, #5F00B8, #931FFF)',
  Article: 'linear-gradient(225deg, #FFD500, #FFE208)',
  default: 'linear-gradient(225deg, #ccc, #f2f2f2)',
};

const partOfSpeechParticleColors = {
  Noun: ['#0066FF', '#1F78FF'],        // Two shades of blue
  Verb: ['#FF0000', '#FF5000'],        // Two shades of red
  Adjective: ['#5F00B8', '#931FFF'],   // Two shades of purple
  Article: ['#FFD500', '#FFE208'],     // Two shades of yellow
  default: ['#CCCCCC', '#F2F2F2'],     // Neutral colors
};


function CardsPage() {
  // State to store fetched cards
  const [cards, setCards] = useState([]);
  const [activeColor, setActiveColor] = useState(partOfSpeechParticleColors.default);
  const { setModalContent, setModalVisible } = useModal();
  const swiperRef = useRef(null);

// Edit Card

  const handleEditCardClick = () => {
    console.log("Edit button clicked");

    const swiper = swiperRef.current; // Access the Swiper instance
    console.log("Swiper instance from ref:", swiper);

    const activeIndex = swiper?.realIndex; // Get the current active slide index
    console.log("Active index:", activeIndex);

    const activeCard = cards[activeIndex]; // Retrieve the active card
    console.log("Active card:", activeCard);

    if (activeCard) {
      setModalContent(<EditCardModal card={activeCard} />);
      setModalVisible(true);
    } else {
      console.error("No active card found");
    }
  };


  // Fetch cards from the backend
  useEffect(() => {
    fetch('/api/cards') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleCreateCardClick = () => {
    setModalContent(<CreateCardModal />);
    setModalVisible(true);
  };

  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.realIndex; // Get the correct slide index
    const activeCard = cards[activeIndex]; // Retrieve the active card
    if (activeCard) {
      // Retrieve gradient for cards
      const color =
        partOfSpeechColors[activeCard.part_of_speech] || partOfSpeechColors.default;

      // Retrieve particle colors for particles
      const particleColors =
        partOfSpeechParticleColors[activeCard.part_of_speech] ||
        partOfSpeechParticleColors.default;

      // Update the active color state for particles
      setActiveColor(particleColors);

      // Optionally, log both for debugging
      console.log("Card Gradient (Color):", color);
      console.log("Particle Colors:", particleColors);
    }
  };



  return (
    // Use position: relative so #particles-js can sit behind it (z-index layering)
    <div
      className={styles.pageContainer}
      style={{ position: "relative", minHeight: "100vh" }}
    >
      {/* The fiery particles behind everything */}
      <ParticlesBackground color={activeColor} />

      {/* Main Content Section */}
      <div className={styles.mainContent}>
        {/* Swiper Section */}
        <div className={styles.swiperBox}>

        <Swiper
            ref={swiperRef} // Attach the ref
            modules={[Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 90,
              modifier: 1,
              slideShadows: true,
            }}
            navigation
            pagination={{ clickable: true }}
            loop
            style={{
              height: "100%",
              width: "100%",
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper; // Set Swiper instance to the ref
              console.log("Swiper initialized:", swiper); // Optional debugging log
            }}
            onSlideChange={(swiper) => handleSlideChange(swiper)}
          >



            {cards.map((card) => (
              <SwiperSlide key={card.id} className={styles.cardWrapper}>
                <div
                  className={styles.flipCard}
                  data-color={card.part_of_speech.toLowerCase()}
                >
                  {/* Front of the Card */}
                  <div
                    className={`${styles.cardSide} ${styles.front}`}
                    style={{
                      backgroundImage:
                        partOfSpeechColors[card.part_of_speech] ||
                        partOfSpeechColors.default,
                    }}
                  >
                    <p className={styles.partOfSpeechTop}>
                      {card.part_of_speech}
                    </p>
                    <p className={styles.cardTitle}>{card.word_text}</p>
                    <p className={styles.partOfSpeechBottom}>
                      {card.part_of_speech}
                    </p>
                  </div>

                  {/* Back of the Card */}
                  <div
                    className={`${styles.cardSide} ${styles.back}`}
                    style={{
                      backgroundImage:
                        partOfSpeechColors[card.part_of_speech] ||
                        partOfSpeechColors.default,
                    }}
                  >
                    <div className={styles.cardContent}>
                      {card.pronunciation && (
                        <div className={styles.cardSection}>
                          <p className={styles.key}>Pronunciation:</p>
                          <p className={styles.value}>{card.pronunciation}</p>
                        </div>
                      )}
                      <div className={styles.cardSection}>
                        <p className={styles.key}>Definition:</p>
                        <p className={styles.value}>{card.definition}</p>
                      </div>
                      {card.example_sentence && (
                        <div className={styles.cardSection}>
                          <p className={styles.key}>Example:</p>
                          <p className={styles.value}>{card.example_sentence}</p>
                        </div>
                      )}
                      {card.example_translation && (
                        <div className={styles.cardSection}>
                          <p className={styles.key}>Translation:</p>
                          <p className={styles.value}>{card.example_translation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Side Menu for Buttons */}
        <div className={styles.buttonBox}>
          <button
            className={styles.circleButton}
            onClick={handleCreateCardClick}
          >
            +
          </button>

          <button
            className={`${styles.circleButton} ${styles.editButton}`}
            onClick={handleEditCardClick}
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>

          <button
            className={`${styles.circleButton} ${styles.deleteButton}`}
            onClick={() => alert("Delete a card")}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
      </div>
    </div>
  );

}

export default CardsPage;
