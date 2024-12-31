import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './styles.module.css';

const partOfSpeechColors = {
  Noun: '#1E90FF', // DodgerBlue
  Verb: '#FF0000', // Red
  Adjective: '#8A2BE2', // BlueViolet
  Article: '#FFD700', // Gold
  default: '#ccc', // Gray for unknown parts of speech
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
    <div className={styles.collectionSection}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        loop
      >
        {cards.map((card) => (

         <SwiperSlide key={card.id} className={styles.cardWrapper}>
         <div
           className={styles.card}
           style={{
             backgroundColor: partOfSpeechColors[card.part_of_speech] || partOfSpeechColors.default,
           }}
         >
           <p className={styles.cardTitle}>{card.word_text}</p> {/* Word Text */}
           <p className={styles.partOfSpeech}>Part of Speech: {card.part_of_speech}</p> {/* Part of Speech */}
           {card.pronunciation && (
             <p className={styles.pronunciation}>Pronunciation: {card.pronunciation}</p>
           )}
           <p className={styles.definition}>Definition: {card.definition}</p> {/* Definition */}
           {card.example_sentence && (
             <p className={styles.exampleSentence}>
               Example: {card.example_sentence}
             </p>
           )}
           {card.example_translation && (
             <p className={styles.exampleTranslation}>
               Translation: {card.example_translation}
             </p>
           )}
         </div>
       </SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
}

export default Collections;
