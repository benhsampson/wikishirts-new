import {
  CHANGE_PREFERRED_SIZE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_GRAND_TOTAL,
  UPDATE_CART_ITEM,
  EMPTY_CART_ITEMS,
  HANDLE_ADDRESS_UPSERT,
  UPDATE_ADDRESS_INFO,
} from '../actions/types';

import shirtSizes from '../constants/shirt-sizes';

const initialState = {
  items: [],
  preferredSize: 'medium',
  address: {},
  addressOptions: {},
  total: 0,
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PREFERRED_SIZE:
    return {
      ...state,
      preferredSize: action.payload,
    };
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(({ id }) => id !== action.payload),
      };
    case UPDATE_GRAND_TOTAL:
      const subtitles = state.items.map(({ price }) => price);
      const total = subtitles.length > 0 ? subtitles.reduce((accumulator, currentPrice) => accumulator + currentPrice) : 0;

      return {
        ...state,
        total,
      };
    case UPDATE_CART_ITEM:
      const { itemId, newSize } = action.payload;
      const otherItems = state.items.filter(({ id }) => id !== itemId);
      const changedItem = state.items.find(({ id }) => id === itemId);
      return {
        ...state,
        items: [
          ...otherItems,
          {
            ...changedItem,
            size: shirtSizes.find(({ value }) => value === newSize),
          }
        ]
      };
    case EMPTY_CART_ITEMS:
      return {
        ...state,
        items: [],
      };
    case HANDLE_ADDRESS_UPSERT:
      return {
        ...state,
        address: action.payload,
      };
    case UPDATE_ADDRESS_INFO:
      return {
        ...state,
        addressOptions: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
