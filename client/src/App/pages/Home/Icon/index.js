import styled from 'styled-components';

const Icon = styled.img`
  height: ${({ small }) => small ? '1.25rem' : '1.5rem'};
  min-width: ${({ small }) => small ? '1.25rem' : '1.5rem'};
  margin-right: ${({ spacingRight }) => spacingRight ? '0.75rem' : 0};
`;

export default Icon;
