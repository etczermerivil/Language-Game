// redux/cards.js

// Action Type
const ADD_CARD = "cards/ADD_CARD";

// Action Creator
export const addCard = (card) => ({
  type: ADD_CARD,
  card,
});

// Thunk to Create Card
export const thunkCreateCard = (cardData) => async (dispatch) => {
  const csrfToken = document.cookie.match(/csrf_token=([^;]+)/)?.[1];

  const response = await fetch("/api/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify(cardData),
  });

  if (response.ok) {
    const newCard = await response.json();
    dispatch(addCard(newCard)); // Update state with the new card
    return null; // Indicate success
  } else {
    const errorData = await response.json();
    return errorData; // Send errors back to the component
  }
};

// Initial State
const initialState = {
  cards: [],
};

// Reducer
export default function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.card],
      };
    default:
      return state;
  }
}
