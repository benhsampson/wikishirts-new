import styled from 'styled-components';
import { lighten } from 'polished';

const CartContinueButton = styled.button`
  background: #405DCF;
  border: 1px solid #405DCF;
  border-radius: 4px;
  color: #FFFFFF;
  cursor: pointer;
  font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1.125em;
  font-weight: 500;
  margin: 0 1.5rem;
  outline: none;
  padding: 1rem 2rem;

  &:hover {
    background: ${lighten(0.05, '#405DCF')};
    border-color: ${lighten(0.05, '#405DCF')};
  }

  &:focus {
    background: ${lighten(0.05, '#405DCF')};
    border-color: ${lighten(0.05, '#405DCF')};
  }
`;

export default CartContinueButton;
