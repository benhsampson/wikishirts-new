import React from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper,
  Container,
  Title,
  Subtitle,
  Items,
  Item,
  B,
} from './style';

class SuccessfulOrder extends React.Component {
  componentWillMount() {
    setTimeout(() => this.props.goToStep(1), 10000);
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <Title>
            Success! Your order has been processed
          </Title>
          <Subtitle>
            Check your emails for the receipt.
            You should receive a package with your shirts in roughly <B>2-3 weeks</B>.
          </Subtitle>
          <Subtitle>
            <B>Your order:</B>
          </Subtitle>
          <Items>
            {this.props.cartItems.map(({ id, name }) => (
              <Item key={id}><B>1x</B> {name} - White T-Shirt</Item>
            ))}
          </Items>
        </Container>
      </Wrapper>
    );
  }
}

SuccessfulOrder.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  goToStep: PropTypes.func.isRequired,
};

export default SuccessfulOrder;
