import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';

import closeIconWhite from '../../../../assets/close-white.svg';
import shoppingCart from '../../../../assets/shopping-cart-white.svg';

import {
  CartWrapper,
  CartButtonWrapper,
  CartButton,
  CartUnderlay,
  CartContainer,
  CartHeader,
  CartHeaderTitle,
  CartCount,
  CartContent,
  CartFooter,
  CartFooterPrompt,
  ButtonLink,
  BreadcrumbsContainer,
  Breadcrumb,
  BreadcrumbSeperator,
} from './style';

import IconButton from '../IconButton';
import Icon from '../Icon';
import CartList from './CartList';
import Address from './Address';
import Payment from './Payment';
import SuccessfulOrder from './SuccessfulOrder';

class Cart extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    step: PropTypes.number.isRequired,
    cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number,
    address: PropTypes.object.isRequired,
    recentlyPurchasedShirts: PropTypes.arrayOf(PropTypes.object).isRequired,
    incrementStep: PropTypes.func.isRequired,
    goToStep: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    updateCartItem: PropTypes.func.isRequired,
    openCart: PropTypes.func.isRequired,
    closeCart: PropTypes.func.isRequired,
    focusSearch: PropTypes.func.isRequired,
    handleAddressUpsert: PropTypes.func.isRequired,
    updateAddressOptions: PropTypes.func.isRequired,
    emptyCartItems: PropTypes.func.isRequired,
    mixpanel: PropTypes.object.isRequired,
  };

  static defaultProps = {
    total: 0,
  };

  renderStep = (step) => {
    switch (step) {
      case 1:
        return <CartList
          cartItems={this.props.cartItems}
          total={this.props.total}
          removeFromCart={this.props.removeFromCart}
          updateCartItem={this.props.updateCartItem}
          incrementStep={this.props.incrementStep}
          closeCart={this.props.closeCart}
          focusSearch={this.props.focusSearch}
        />;
      case 2:
        return <Address
          address={this.props.address}
          addressOptions={this.props.addressOptions}
          handleAddressUpsert={this.props.handleAddressUpsert}
          updateAddressOptions={this.props.updateAddressOptions}
          incrementStep={this.props.incrementStep}
        />
      case 3:
        return <Elements><Payment
          cartItems={this.props.cartItems}
          address={this.props.address}
          total={this.props.total}
          goToStep={this.props.goToStep}
          emptyCartItems={this.props.emptyCartItems}
          mixpanel={this.props.mixpanel}
        /></Elements>
      case 4:
        return <SuccessfulOrder
          cartItems={this.props.recentlyPurchasedShirts}
          goToStep={this.props.goToStep}
        />;
      default:
        return <p>Shopping cart broke, please refresh the page, contact us if this happens</p>;
    }
  };

  render() {
    const {
      open,
      step,
      goToStep,
      cartItems,
      openCart,
      closeCart,
    } = this.props;
    return (
      <CartWrapper>
        <CartButtonWrapper>
          <CartButton onClick={openCart}>
            <Icon spacingRight src={shoppingCart} alt="Open shopping cart" />
            {cartItems.length}
          </CartButton>
        </CartButtonWrapper>
        {open ? (
          <React.Fragment>
            <CartUnderlay onClick={closeCart} />
            <CartContainer>
              <CartHeader>
                <IconButton compensateLeft dark onClick={closeCart}>
                  <Icon src={closeIconWhite} alt="Close the shopping cart" />
                </IconButton>
                <CartHeaderTitle>
                  Your cart
                </CartHeaderTitle>
                <CartCount>
                  {cartItems.length} items
                </CartCount>
              </CartHeader>
              <CartContent>
                {step === 2 ? (
                  <BreadcrumbsContainer>
                    <Breadcrumb previous onClick={() => goToStep(1)}>Cart</Breadcrumb>
                    <BreadcrumbSeperator>•</BreadcrumbSeperator>
                    <Breadcrumb selected>Address</Breadcrumb>
                    <BreadcrumbSeperator>•</BreadcrumbSeperator>
                    <Breadcrumb>Payment</Breadcrumb>
                  </BreadcrumbsContainer>
                ) : ''}
                {step === 3 ? (
                  <BreadcrumbsContainer>
                    <Breadcrumb previous onClick={() => goToStep(1)}>Cart</Breadcrumb>
                    <BreadcrumbSeperator>•</BreadcrumbSeperator>
                    <Breadcrumb previous onClick={() => goToStep(2)}>Address</Breadcrumb>
                    <BreadcrumbSeperator>•</BreadcrumbSeperator>
                    <Breadcrumb selected>Payment</Breadcrumb>
                  </BreadcrumbsContainer>
                ) : ''}
                {this.renderStep(step)}
              </CartContent>
              <CartFooter>
                <CartFooterPrompt>
                  Have any questions? Need some help?
                </CartFooterPrompt>
                <ButtonLink>
                  Talk to us
                </ButtonLink>
              </CartFooter>
            </CartContainer>
          </React.Fragment>
        ) : ''}
      </CartWrapper>
    );
  }
}

export default Cart;
