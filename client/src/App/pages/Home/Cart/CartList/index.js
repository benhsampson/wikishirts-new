import React from 'react';
import PropTypes from 'prop-types';

import { convertToDollars, formatAsCurrency } from '../../../../../utils/currency';

import {
  Wrapper,
  Container,
  EmptyCartText,
  FindSomethingButton,
} from './style';

import CartListItem from './CartListItem';
import CartContinueButton from '../CartContinueButton';

const CartList = ({
  cartItems,
  total,
  removeFromCart,
  updateCartItem,
  incrementStep,
  closeCart,
  focusSearch,
}) => {
  // const subtitles = cartItems.map(({ price }) => price);
  // const grandTotal = subtitles.length ? subtitles.reduce((accumulator, currentPrice) => accumulator + currentPrice) : null;
  const grandTotalFormatted = formatAsCurrency(convertToDollars(total));

  const sortedCartItems = cartItems.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

  return (
    <Wrapper>
      {cartItems.length ? (
        <React.Fragment>
          <Container>
            {sortedCartItems.map((item) => (
              <CartListItem
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
                updateCartItem={updateCartItem}
              />
            ))}
          </Container>
          <CartContinueButton onClick={incrementStep}>
            {grandTotalFormatted} • Continue
          </CartContinueButton>
        </React.Fragment>
        ) : (
          <React.Fragment>
            <EmptyCartText>Your cart is currently empty</EmptyCartText>
            <FindSomethingButton onClick={() => {
              closeCart();
              focusSearch();
            }}>
              {'Start shopping'}
            </FindSomethingButton>
          </React.Fragment>
        )}
    </Wrapper>
  );
}

CartList.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    addedAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    size: PropTypes.object.isRequired,
  })).isRequired,
  total: PropTypes.number,
  removeFromCart: PropTypes.func.isRequired,
  updateCartItem: PropTypes.func.isRequired,
  incrementStep: PropTypes.func.isRequired,
  closeCart: PropTypes.func.isRequired,
  focusSearch: PropTypes.func.isRequired,
};

CartList.defaultProps = {
  total: 0,
};

export default CartList;
