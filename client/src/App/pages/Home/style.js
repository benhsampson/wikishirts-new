import styled from 'styled-components';
import { lighten } from 'polished';

const Wrapper = styled.div`
  ${({ open }) => open ? `
    left: 0;
    overflow: hidden;
    position: fixed;
    right: 0;
  ` : ''};
`;

const BrandHeader = styled.header`
  align-items: flex-end;
  background: ${({ src }) => `url(${src})`};
  display: flex;
  width: 100%;
  overflow: hidden;
  height: 0.625rem;
`;

const Shirts = styled.section`
  background: #405dcf;
  width: 100%;
  padding: 5rem 0;
  min-height: 101vh;

  @media (max-width: 992px) {
    padding: 1.5rem 0;
  }
`;

const ShirtsList = styled.ul`
  display: grid;
  grid-gap: 2rem;
`;

const ShirtsListItem = styled.li`
  background: #405dcf;
  border-radius: 8px;
  padding: 1.5rem;

  &:hover {
    background: ${lighten(0.04, '#405dcf')};
  }
`;

const ShirtName = styled.h4`
  color: #FFFFFF;
  font-size: 1.5em;
  font-weight: 500;
  margin-bottom: 0.5rem;

  @media (max-width: 992px) {
    margin-bottom: 0.75rem;
  }
`;

const ShirtDescription = styled.p`
  color: rgba(255,255,255,0.6);
  font-size: 1em;
  line-height: 1.8;
  margin-bottom: 1rem;

  @media (max-width: 992px) {
    margin-bottom: 1.25rem;
  }
`;

const ShirtPreviewButton = styled.button`
  background: transparent;
  border: 1px solid #FFFFFF;
  border-radius: 4px;
  color: #FFFFFF;
  cursor: pointer;
  font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1em;
  font-weight: 500;
  outline: none;
  padding: 0.5rem 1rem;
`;

const FAQ = styled.section`
  width: 100%;
  padding: 4rem 0;
`;

const FAQHeading = styled.h2`
  color: rgba(0,0,0,0.8);
  font-size: 1.75em;
  font-weight: 500;
  margin-bottom: 1.5rem;
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
`;

const Question = styled.h5`
  color: rgba(0,0,0,0.8);
  font-size: 1em;
  font-weight: 500;
`;

const Answer = styled.p`
  color: rgba(0,0,0,0.6);
  font-size: 1em;
  grid-column: 2 / span 2;
`;

export {
  Wrapper,
  BrandHeader,
  Shirts,
  ShirtsList,
  ShirtsListItem,
  ShirtName,
  ShirtDescription,
  ShirtPreviewButton,
  FAQ,
  FAQHeading,
  QAsContainer,
  QA,
  Question,
  Answer,
};
