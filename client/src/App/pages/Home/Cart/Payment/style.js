import styled from 'styled-components';
import { lighten } from 'polished';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaymentInfo = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const InjectedElementWrapper = styled.div`
  font-size: 18px;

  input, .StripeElement {
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    cursor: text;
    font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 0.875em;
    min-width: 0;
    outline: 0;
    padding: 0.6rem 0.75rem;
    width: 100%;
  }

  input::placeholder {
    color: rgba(0,0,0,0.5);
  }

  input:focus, .StripeElement--focus {
    border-color: #405DCF;
  }
`;

const PayButton = styled.button`
  background: #449C6C;
  border: 1px solid #449C6C;
  border-radius: 4px;
  color: #FFFFFF;
  cursor: pointer;
  font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1.125em;
  font-weight: 500;
  margin-top: 1.5rem;
  outline: none;
  padding: 1rem 2rem;

  &:hover {
    background: ${lighten(0.05, '#449C6C')};
    border-color: ${lighten(0.05, '#449C6C')};
  }

  &:focus {
    background: ${lighten(0.05, '#449C6C')};
    border-color: ${lighten(0.05, '#449C6C')};
  }
`;

const Error = styled.p`
  bottom: -2rem;
  color: #CC2B2B;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: right;
`;

const Disclaimer = styled.p`
  color: rgba(0,0,0,0.6);
  font-size: 0.875em;
  text-align: center;
  margin-top: 1.5rem;
`;

const LinkHref = styled.a`
  color: #405dcf;
  display: inline-block;
  text-decoration: none;
`;

export {
  Wrapper,
  PaymentInfo,
  InjectedElementWrapper,
  PayButton,
  Error,
  Disclaimer,
  LinkHref,
};
