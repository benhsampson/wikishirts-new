import styled from 'styled-components';

export const IconButton = styled.button`
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  outline: 0;
  padding: 0.75rem;
  position: absolute;
  top: 5.625rem;
  left: 4rem;
  margin-bottom: 2rem;
  min-width: 26px;

  &:hover, &:focus {
    background: #F5F5F5;
  }
  &:active {
    background: #EEE;
  }
`;
