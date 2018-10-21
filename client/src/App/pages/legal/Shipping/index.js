import React from 'react';
import ReactMarkdown from 'react-markdown';

import {
  Wrapper,
  BrandHeader,
  Container,
  Content,
} from './style';

import BackButton from '../../../components/BackButton';

import purplePattern from '../../../../assets/pattern-purple.svg';

const shipping = `
# Shipping Policy

*Last updated 20/10/2018*

Thanks for visiting and shopping at [www.wikishirts.io](https://wikishirts.io). Following are the terms and conditions that constitute our Shipping Policy.

###### TLDR;

We ship internationally for free. Fulfilment takes 2-7 business days, shipping takes 5-10 business days on top of that.

###### Shipment processing time

All orders are processed and products are fulfilled in 2-7 business days. Orders are not shipped or delivered on weekends or holidays.

If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email.

###### Shipping rates and delivery estimates

Shipping charges for your order will be calculated and displayed at checkout.

All shipment costs are free.

Delivery times vary between 5-10 business days with the Economy shipment method. Economy is the only shipment method we provide. Delivery delays can occasionally occur.

###### Shipment to P.O boxes or APO/FPO addresses

[www.wikishirts.io](https://wikishirts.io) ships to international addresses and API/FPO/DPO addresses.

###### Shipment confirmation and order tracking

You will receive a shipment confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.

###### Customs, duties, and taxes

[www.wikishirts.io](https://wikishirts.io) is not responsible for any customs or taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.)

###### Damages

[www.wikishirts.io](https://wikishirts.io) is not liable for any products damaged ot lost during shipping. If you received your order damaged, please contact the shipment carrier to file a cliam.
`;

const Shipping = (props) => (
  <Wrapper>
    <BrandHeader src={purplePattern} />
    <Container>
      <Content>
        <BackButton onClick={() => props.history.push('/')} />
        <ReactMarkdown source={shipping} />
      </Content>
    </Container>
  </Wrapper>
);

export default Shipping;
