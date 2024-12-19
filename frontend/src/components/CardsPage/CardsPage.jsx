import { useEffect, useState } from 'react';
import axios from 'axios';

const CardsPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/cards'); // Your backend API
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div>
      <h1>Your Cards</h1>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>{card.word}</li>
        ))}
      </ul>
    </div>
  );
};

export default CardsPage;
