import styled from 'styled-components';

const IconButton = styled.button`
  align-items: center;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-left: ${({ compensateLeft }) => compensateLeft ? '-0.75rem' : 0};
  margin-right: ${({ compensateRight }) => compensateRight ? '-0.75rem' : 0};
  max-width: 3rem;
  outline: none;
  padding: 0.75rem;

  &:hover {
    background: ${({ dark }) => dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
  }
`;

export default IconButton;
