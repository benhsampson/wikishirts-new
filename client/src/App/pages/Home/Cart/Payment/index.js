import React from 'react';
import PropTypes from 'prop-types';
import {
  CardElement,
  // CardNumberElement,
  // CardExpiryElement,
  // CardCVCElement,
  injectStripe,
} from 'react-stripe-elements';

import { convertToDollars, formatAsCurrency } from '../../../../../utils/currency';

import sizeToSku from '../../../../../constants/size-to-sku';
import currencyType from '../../../../../constants/currency-type';

import {
  Wrapper,
  PaymentInfo,
  InjectedElementWrapper,
  PayButton,
  Error,
  Disclaimer,
  LinkHref,
} from './style';

import FormGroup, { FormField, Label, Input } from '../FormGroup';

class Payment extends React.Component {
  state = {
    loading: false,
    error: '',
    cardError: '',
    name: '',
    email: '',
  };

  static propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    address: PropTypes.object.isRequired,
    total: PropTypes.number,
    goToStep: PropTypes.func.isRequired,
    emptyCartItems: PropTypes.func.isRequired,
  };

  static defaultProps = {
    total: 0,
  };

  onSubmit = async (e) => {
    e.preventDefault();

    if (this.state.loading) {
      // Do nothing to prevent accidental multiple orders
    } else {
      if (!this.props.stripe) {
        this.setState({ error: '* Payment provider still loading, please wait a few seconds' });
      } else {
        this.setState({ loading: true });

        const { billing, shipping } = this.props.address;

        const { token, error } = await this.props.stripe.createToken({
          name: this.state.name,
          email: this.state.email,
          address_line1: billing.streetAddress,
          address_country: billing.country.label,
          address_state: billing.stateProvince.label,
          address_city: billing.city.label,
          address_zip: billing.zipPostal,
        });

        if (error) {
          this.setState({ loading: false, cardError: `* ${error.message}` });
        } else {
          // const items = this.props.cartItems.map(({ name, pageId, size: { value, label } }) => ({
          //   type: 'sku',
          //   parent: sizeToSku[value],
          //   description: `${name} (${pageId})`,
          // }));

          const metadata = {};

          const items = [];

          this.props.cartItems.forEach(({ name, pageId, size: { value, label } }) => {
            const thisItemsSku = sizeToSku[value];

            // An item with the same size exists
            if (items.filter(({ parent }) => parent === thisItemsSku).length) {
              const itemInQuestion = items.find(({ parent }) => parent === thisItemsSku);

              const reconfiguredItem = {
                type: itemInQuestion.type,
                parent: itemInQuestion.parent,
                quantity: itemInQuestion.quantity + 1,
              };

              items[items.indexOf(itemInQuestion)] = reconfiguredItem;
              Object.assign(metadata, {
                ...metadata,
                [`${thisItemsSku}`]: `${metadata[thisItemsSku]} + ${pageId}`,
              });
            // No item with the same size exists as of yet
            } else {
              items.push({
                type: 'sku',
                parent: thisItemsSku,
                quantity: 1,
              });
              Object.assign(metadata, { [`${thisItemsSku}`]: `${pageId}` });
            }
          });

          const order = {
            currency: currencyType,
            items,
            // This is supposed to be the email address of the customer placing the order DONE :)
            email: this.state.email,
            metadata,
            shipping: {
              name: shipping.recipientName,
              address: {
                line1: shipping.streetAddress,
                city: shipping.city.label,
                state: shipping.stateProvince.label,
                postal_code: shipping.zipPostal,
                country: shipping.country.label,
              },
            },
          };

          const response = await fetch('/api/create-and-pay-for-order', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({ order, source: token }),
          });
          const body = await response.json();

          if (response.status !== 200) this.setState({ error: `* ${response.message}` }, () => {
            if (process.env.NODE_ENV === 'production')
              this.props.mixpanel.track('Payment unsuccessful', { error: body.error });
          });

          if (body.order) {
            this.setState({ loading: false, error: '', cardError: '' });
            this.props.emptyCartItems();
            this.props.goToStep(4);

            if (process.env.NODE_ENV === 'production')
              this.props.mixpanel.track('Payment successful', { order: body.order });
          } else {
            console.log(body.error);
            this.setState({ loading: false, error: `* ${body.error.message}` });

            if (process.env.NODE_ENV === 'production')
              this.props.mixpanel.track('Payment unsuccessful', { error: body.error });
          }
        }
      }
    }
  };

  render() {
    return (
      <Wrapper>
        <form onSubmit={this.onSubmit}>
          <PaymentInfo>
            <FormGroup tight columns={2}>
              <FormField>
                <Label>Name on card</Label>
                <Input
                  required
                  placeholder="Jane Doe"
                  onChange={e => (this.setState({ name: e.target.value }))}
                  value={this.state.name}
                />
              </FormField>
              <FormField>
                <Label>Your email</Label>
                <Input
                  required
                  placeholder="your@email.com"
                  type="email"
                  onChange={e => (this.setState({ email: e.target.value }))}
                  value={this.state.email}
                />
              </FormField>
            </FormGroup>
            {/* <FormGroup columns={4}>
              <FormField span={2}>
                <Label>Card number</Label>
                <InjectedElementWrapper>
                  <CardNumberElement />
                </InjectedElementWrapper>
              </FormField>
              <FormField>
                <Label>Expiration</Label>
                <InjectedElementWrapper>
                  <CardExpiryElement />
                </InjectedElementWrapper>
              </FormField>
              <FormField>
                <Label>CVC</Label>
                <InjectedElementWrapper>
                  <CardCVCElement />
                </InjectedElementWrapper>
              </FormField>
            </FormGroup> */}
            <FormField>
              <Label>Card information</Label>
              <InjectedElementWrapper>
                <CardElement />
              </InjectedElementWrapper>
            </FormField>
            {this.state.cardError && <Error>{this.state.cardError}</Error>}
            <PayButton type="submit">
              {!this.state.loading
                ? `${formatAsCurrency(convertToDollars(this.props.total))} • Pay now`
                : 'Processing...'}
            </PayButton>
            {this.state.error && <Error>{this.state.error}</Error>}
          </PaymentInfo>
        </form>
        <Disclaimer>
          Secure and encrypted by <LinkHref href="https://Stripe.com">Stripe</LinkHref>
        </Disclaimer>
      </Wrapper>
    );
  }
}

export default injectStripe(Payment);
