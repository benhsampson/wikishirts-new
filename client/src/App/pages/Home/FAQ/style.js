import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  padding: 4rem 0;
`;

const FAQHeading = styled.h2`
  color: rgba(0,0,0,0.8);
  font-size: 1.75em;
  font-weight: 500;
  margin-bottom: 1.5rem;
  line-height: 1.4;

  @media (max-width: 992px) {
    font-size: 1.6em;
  }
`;

const QAsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QA = styled.div`
  border-bottom: 1px solid #E0E0E0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  padding: 1.5rem 0;

  &:first-child {
    border-top: 1px solid #E0E0E0;
  }

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
  }
`;

const Question = styled.h5`
  color: rgba(0,0,0,0.8);
  font-size: 1em;
  font-weight: 500;

  @media (max-width: 992px) {
    font-size: 1.125em;
    margin-bottom: 1rem;
  }
`;

const Answer = styled.p`
  color: rgba(0,0,0,0.6);
  font-size: 1em;
  grid-column: 2 / span 2;
  line-height: 1.7;

  @media (max-width: 992px) {
    font-size: 1.125em;
  }
`;

const B = styled.b`
  font-weight: 500;
`;

export {
  Wrapper,
  FAQHeading,
  QA,
  QAsContainer,
  Question,
  Answer,
  B,
}
