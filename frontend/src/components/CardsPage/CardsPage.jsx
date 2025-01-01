import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow'
import styles from './styles.module.css';

// const partOfSpeechColors = {
//   Noun: '#0066FF', // DodgerBlue
//   Verb: '#FF0000', // Red
//   Adjective: '#7C05E8', // BlueViolet
//   Article: '#FFD700', // Gold
//   default: '#ccc', // Gray for unknown parts of speech
// };

const partOfSpeechColors = {
  Noun: 'radial-gradient(180deg, #0066FF, #4A90E2)', // Gradient from DodgerBlue to a lighter blue
  Verb: 'radial-gradient(180deg, #FF0000, #FF6347)', // Gradient from red to a softer red
  Adjective: 'radial-gradient(180deg, #5F00B8, #7400E0',
  Article: 'radial-gradient(180deg, #FFD700, #FFEC8B)',
  default: 'radial-gradient(180deg, #ccc, #f2f2f2)',
};

function Collections() {
  // State to store fetched cards
  const [cards, setCards] = useState([]);

  // Fetch cards from the backend
  useEffect(() => {
    fetch('/api/cards') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Render the component
  return (
    <div className={styles.pageContainer}>
      {/* Swiper Section */}
      <div className={styles.collectionSection}>
        <Swiper
          modules={[Navigation, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          navigation
          pagination={{ clickable: true }}
          loop
        >
          {cards.map((card) => (
  <SwiperSlide key={card.id} className={styles.cardWrapper}>
    <div className={styles.flipCard}>
      {/* Front of the Card */}
      <div
        className={`${styles.cardSide} ${styles.front}`}
        style={{
          backgroundImage:
            partOfSpeechColors[card.part_of_speech] ||
            partOfSpeechColors.default,
        }}
      >
        <p className={styles.partOfSpeechTop}>{card.part_of_speech}</p>
        <p className={styles.cardTitle}>{card.word_text}</p>
        <p className={styles.partOfSpeechBottom}>{card.part_of_speech}</p>
      </div>

     { /* Back of the Card */}
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
      <p className={styles.pronunciation}>
        <span className={styles.key}>Pronunciation:</span> {card.pronunciation}
      </p>
    )}
    <p className={styles.definition}>
      <span className={styles.key}>Definition:</span> {card.definition}
    </p>
    {card.example_sentence && (
      <p className={styles.exampleSentence}>
        <span className={styles.key}>Example:</span> {card.example_sentence}
      </p>
    )}
    {card.example_translation && (
      <p className={styles.exampleTranslation}>
        <span className={styles.key}>Translation:</span> {card.example_translation}
      </p>
    )}
  </div>
</div>
    </div>
  </SwiperSlide>
))}

                  {/* Button Section */}
        <div className={styles.buttonContainer}>
          <button
            className={styles.createCardButton}
            onClick={() => alert("Create a new card")}
          >
            +
          </button>
        </div>
        </Swiper>


      </div>
    </div>
  );


}

export default Collections;
