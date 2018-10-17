import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const EmptyCartText = styled.p`
  color: rgba(0,0,0,0.6);
  font-size: 1.125em;
  margin: 1.5rem 1.5rem 1rem;
  text-align: center;
`;

const FindSomethingButton = styled.button`
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #405DCF;
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
    background: rgba(0,0,0,0.05);
    border-color: rgba(0,0,0,0.05);
  }

  &:focus {
    background: rgba(0,0,0,0.05);
    border-color: rgba(0,0,0,0.05);
  }
`;

export {
  Wrapper,
  Container,
  EmptyCartText,
  FindSomethingButton,
};
