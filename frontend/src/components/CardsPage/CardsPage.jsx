import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow'
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
            modules={[Navigation, EffectCoverflow]} // Add EffectCoverflow here
            effect="coverflow" // Enable the coverflow effect
            grabCursor={true} // Allow grabbing the slider with the mouse
            centeredSlides={true} // Center the active slide
            slidesPerView={3} // Adjust number of visible slides
            coverflowEffect={{
              rotate: 50, // Degree of rotation
              stretch: 0, // Space between slides
              depth: 100, // 3D depth effect
              modifier: 1, // Effect intensity
              slideShadows: true, // Enable shadows for slides
            }}
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
           <p className={styles.partOfSpeech}>{card.part_of_speech}</p> {/* Part of Speech */}

           <p className={styles.cardTitle}>{card.word_text}</p> {/* Word Text */}

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
