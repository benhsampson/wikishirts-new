import React from 'react';
import PropTypes from 'prop-types';

import { convertToDollars, formatAsCurrency } from '../../../../../../utils/currency';

import shirtSizes from '../../../../../../constants/shirt-sizes';

import deleteIcon from '../../../../../../assets/delete.svg';

import {
  Wrapper,
  CartListItemContent,
  CartListItemName,
  CartListItemPrice,
  CartListItemActions,
  CartListItemSelect,
  CartListItemSelectButton,
  CartListItemSelectOptions,
  CartListItemSelectOptionsHeader,
  CartListItemSelectOption,
} from './style';

import IconButton from '../../../IconButton';
import Icon from '../../../Icon';

class CartListItem extends React.Component {
  state = {
    optionsOpen: false,
  };

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      addedAt: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      size: PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    }),
    updateCartItem: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
  };

  render() {
    const { item, updateCartItem, removeFromCart } = this.props;
    return (
      <Wrapper key={item.id}>
        <CartListItemContent>
          <CartListItemName>
            {item.name} - White T-Shirt
          </CartListItemName>
          <CartListItemPrice>
            {formatAsCurrency(convertToDollars(item.price))}
          </CartListItemPrice>
        </CartListItemContent>
        <CartListItemActions>
          <CartListItemSelect>
            <CartListItemSelectButton onClick={() => this.setState({ optionsOpen: !this.state.optionsOpen })}>
              {item.size.label}
            </CartListItemSelectButton>
            <CartListItemSelectOptions open={this.state.optionsOpen}>
              <CartListItemSelectOptionsHeader>Size</CartListItemSelectOptionsHeader>
              {shirtSizes.map(({ value, label }) => (
                <CartListItemSelectOption
                  selected={value === item.size.value}
                  onClick={() => {
                    updateCartItem({ itemId: item.id, newSize: value });
                    this.setState({ optionsOpen: false });
                  }}
                  value={value}
                  key={value}
                >{label}</CartListItemSelectOption>
              ))}
            </CartListItemSelectOptions>
          </CartListItemSelect>
          <IconButton compensateRight onClick={() => removeFromCart(item.id)}>
            <Icon src={deleteIcon} alt="Remove item from cart" />
          </IconButton>
        </CartListItemActions>
      </Wrapper>
    );
  }
}

export default CartListItem;
