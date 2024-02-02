import { createStore } from 'redux';

// Define your initial state and reducer
const initialState = {
  capturedPals: [], // Example state to store captured pals
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CAPTURED_PALS':
      return {
        ...state,
        capturedPals: action.payload,
      };
    default:
      return state;
  }
};

// Create and export the Redux store
const store = createStore(rootReducer);

export default store;
