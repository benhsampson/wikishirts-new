import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const Title = styled.h4`
  color: #0C5C3C;
  font-size: 1.25em;
  margin: 1.5rem;
  text-align: center;
`;

const Subtitle = styled.h5`
  color: rgba(0,0,0,0.6);
  font-size: 1.125em;
  margin: 0 1.5rem 1.5rem;
  text-align: center;
`;

const Items = styled.ul`
  list-style: initial;
  margin: 0 auto;
`;

const Item = styled.li`
  color: rgba(0,0,0,0.8);
  font-size: 1.125em;
  padding: 0.5rem 0;
`;

const B = styled.span`
  font-weight: 500;
`;

export {
  Wrapper,
  Container,
  Title,
  Subtitle,
  Items,
  Item,
  B,
};
