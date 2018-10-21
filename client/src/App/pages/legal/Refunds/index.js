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

const refunds = `
# Returns & Refunds Policy

*Last updated 20/10/2018*

Thanks for shopping at [www.wikishirts.io](https://wikishirts.io).

If you’re not entirely satisfied with your purchase, we’re here to help.

###### Returns

We don’t accept returns because our shirts are custom and unique. Refunds may still be made despite being unable to receive and inspect the returned item.

As returns are not accepted, no shipping or re-fulfillment costs are necessary.

###### Refunds

If the refund is approved (which it most likely will be), we will initiate a refund to your credit card (or original method of payment).

You will receive the credit within a certain number of days, depending on your card issuer’s policies.

###### Contact us

If you have any questions on returns or refunding your item, please contact us.
`;

const Refunds = (props) => (
  <Wrapper>
    <BrandHeader src={purplePattern} />
    <Container>
      <Content>
        <BackButton onClick={() => props.history.push('/')} />
        <ReactMarkdown source={refunds} />
      </Content>
    </Container>
  </Wrapper>
);

export default Refunds;
