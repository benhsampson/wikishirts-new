import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BillingInfo = styled.section`
  padding: 2.5rem 1.5rem 1.25rem;
  position: relative;

  &:before {
    background: rgba(0,0,0,0.05);
    border-radius: 0 0 4px 4px;
    color: rgba(0,0,0,0.8);
    content: "Billing address";
    font-size: 0.75em;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-transform: uppercase;
    top: 0;
  }
`;

const ShippingInfo = styled.section`
  border-top: 1px solid #E0E0E0;
  margin-bottom: 1rem;
  padding: 2.5rem 1.5rem 1.25rem;
  position: relative;

  &:before {
    background: rgba(0,0,0,0.05);
    border-radius: 0 0 4px 4px;
    color: rgba(0,0,0,0.8);
    content: "Shipping address";
    font-size: 0.75em;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-transform: uppercase;
    top: 0;
  }
`;

export {
  Wrapper,
  BillingInfo,
  ShippingInfo,
};
