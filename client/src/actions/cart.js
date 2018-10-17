import {
  CHANGE_PREFERRED_SIZE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_GRAND_TOTAL,
  UPDATE_CART_ITEM,
  EMPTY_CART_ITEMS,
  HANDLE_ADDRESS_UPSERT,
  UPDATE_ADDRESS_INFO,
} from './types';

export const changePreferredSize = newSize => dispatch => dispatch({
  type: CHANGE_PREFERRED_SIZE,
  payload: newSize,
});

export const addToCart = item => dispatch => dispatch({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = itemId => dispatch => dispatch({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const updateGrandTotal = () => dispatch => dispatch({
  type: UPDATE_GRAND_TOTAL,
});

export const updateCartItem = options => dispatch => dispatch({
  type: UPDATE_CART_ITEM,
  payload: options,
});

export const emptyCartItems = () => dispatch => dispatch({
  type: EMPTY_CART_ITEMS,
});

export const handleAddressUpsert = options => dispatch => dispatch({
  type: HANDLE_ADDRESS_UPSERT,
  payload: options,
});

export const updateAddressOptions = options => dispatch => dispatch({
  type: UPDATE_ADDRESS_INFO,
  payload: options,
});
