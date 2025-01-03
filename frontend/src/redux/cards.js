// Action Types
const ADD_CARD = "cards/addCard";

// Action Creators
const addCard = (card) => ({
  type: ADD_CARD,
  payload: card,
});

const getCsrfToken = () => {
    const match = document.cookie.match(/csrf_token=([^;]+)/);
    return match ? match[1] : null;
  };

// Thunk for Creating a New Card
export const thunkCreateCard = (cardData) => async (dispatch) => {
  try {
    const response = await fetch("/api/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addCard(data)); // Dispatch the action to add the card to the Redux store
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages; // Return validation errors from the server
    } else {
      return { server: "Something went wrong. Please try again." };
    }
  } catch (err) {
    console.error("Error creating card:", err);
    return { server: "An unexpected error occurred. Please try again later." };
  }
};

// Initial Statex
const initialState = { cards: [] };

// Reducer
function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload], // Add the new card to the existing list
      };
    default:
      return state;
  }
}

export default cardsReducer;
