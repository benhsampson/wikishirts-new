import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';

const ModalWrapper = styled.div`
  position: absolute;

  canvas {
    background: transparent;
  }
`;

const OffScreenHDShirtRender = styled.div`
  position: absolute;
  pointer-events: none;
  height: 4000px;
  left: -9999px;
  margin: auto;
  width: 4000px;
  text-align: justify;
  top: 0;
`;

const TempShirtContent = styled.div`
  color: #222222;
  cursor: default;
  font-size: 50px;
  line-height: 1.8;
  left: 50%;
  position: absolute;
  pointer-events: none;
  height: 1000px;
  margin: auto;
  width: 1000px;
  text-align: justify;
  transform: translateX(-50%);
  top: 800px;

  ::selection {
    background: transparent;
    color: initial;
  }

  .name {
    font-size: 75px;
    font-weight: 600;
    line-height: 1;

    ::selection {
      background: transparent;
      color: initial;
    }
  }

  .link {
    color: #0645AD;
    pointer-events: none;
    text-decoration: none;

    ::selection {
      background: transparent;
      color: initial;
    }
  }
`;

const ModalUnderlay = styled.div`
  background: rgba(0,0,0,0.6);
  bottom: 0;
  height: 100vh;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  z-index: 6;
`;

const PreviewModalContainer = styled.div`

`;

const PreviewModal = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  max-width: 60rem;
  width: 100%;
  margin: 4rem 1.5rem;
  left: 50%;
  position: fixed;
  transform: translateX(-50%);
  z-index: 7;

  @media (max-width: 992px) {
    width: calc(100% - 2rem);
    margin: 1rem auto 0;
    overflow-y: auto;
    height: 100%;
    z-index: 10;
  }
`;

const TemporaryShirtImage = styled.img`
width: 100%;
`;

const ModalHeader = styled.header`
  align-items: center;
  border-bottom: 1px solid #E0E0E0;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  width: 100%;

  @media (max-width: 992px) {
    background: #FFFFFF;
    position: fixed;
    z-index: 12;
  }
`;

const ModalHeading = styled.h5`
  color: rgba(0,0,0,0.6);
  font-size: 0.875em;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const ModalContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 992px) {
    grid-template-columns: auto;
  }
`;

const ModalShirtImageContainer = styled.div`
  padding: 3rem;

  @media (max-width: 992px) {
    padding: 4rem 0 0;
  }
`;

const ShirtImage = styled.div`
  background: transparent;
  width: 100%;
  padding-top: 1.5rem;
  position: relative;
`;

const ShirtImageAction = styled.p`
  color: rgba(0,0,0,0.7);
  font-size: 1em;
  margin-top: 1.25rem;
`;

const UnloadedShirtContainer = styled.div`
  position: relative;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 5px solid rgba(0,0,0,0.1);
  border-top: 5px solid rgba(0,0,0,0.4);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 1s linear infinite;
  position: absolute;

  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const ShirtImageContent = styled.div`
  position: absolute;
  pointer-events: none;
  height: 108px;
  left: 50%;
  margin: auto;
  width: 108px;
  text-align: justify;
  transform: translateX(-50%);
  top: 108px;

  ::selection {
    background: transparent;
    color: initial;
  }
`;

const ShirtImageHeader = styled.h1`
  color: #222222;
  cursor: default;
  font-size: 7.2px;
  font-family: Georgia, sans-serif;
  font-weight: 1.4;
  word-wrap: break-word;
  width: 100%;

  ::selection {
    background: transparent;
    color: initial;
  }
`;

const ShirtImageDivider = styled.hr`
  border: 0;
  border-bottom: 0.5px solid #DDDDDD;
  margin: 0;

  ::selection {
    background: transparent;
    color: initial;
  }
`;

const ShirtImageBranding = styled.p`
  color: #555555;
  cursor: default;
  font-size: 3.6px;
  font-family: Arial, sans-serif;
  line-height: 2.5;

  ::selection {
    background: transparent;
    color: initial;
  }
`;

const ShirtImageDescription = styled.p`
  color: #222222;
  cursor: default;
  font-size: 3.6px;
  font-family: Arial, sans-serif;
  line-height: 1.8;

  ::selection {
    background: transparent;
    color: initial;
  }

  img {
    display: none;
  }

  .text {
    cursor: default;

    ::selection {
      background: transparent;
      color: initial;
    }

    .sentence {
      ::selection {
        background: transparent;
        color: initial;
      }
    }

    b {
      font-weight: 600;

      ::selection {
        background: transparent;
        color: initial;
      }
    }

    i {
      ::selection {
        background: transparent;
        color: initial;
      }
    }

    .link {
      color: #0645AD;
      pointer-events: none;
      text-decoration: none;

      ::selection {
        background: transparent;
        color: initial;
      }
    }
  }
`;

const ModalContent = styled.section`
  padding: 2rem;
`;

const ModalShirtName = styled.h3`
  color: rgba(0,0,0,0.8);
  font-size: 1.25em;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ModalShirtPrice = styled.p`
  color: #449C6C;
  font-size: 1.125em;
  margin-bottom: 1.5rem;
`;

const ModalShirtDescription = styled.div`
  p {
    color: rgba(0,0,0,0.7);
    font-size: 1em;
    margin-bottom: 1.25rem;
  }

  ul {
    list-style: initial !important;
    padding-left: 1rem;
  }

  li {
    color: rgba(0,0,0,0.6);
    font-size: 1em;
    margin-bottom: 0.5rem;
  }
`;

const ModalActions = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1.5rem;
  margin: 2rem 0;

  @media (max-width: 992px) {
    grid-template-columns: auto;
  }
`;

const ModalButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ModalButtonGroupButton = styled.button`
  background: #FFFFFF;
  border: 1px solid;
  border-color: ${({ selected }) => selected ? '#333333' : '#E0E0E0'};
  cursor: pointer;
  font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-weight: 500;
  outline: none;
  padding: 1rem 1rem;
  min-width: 54px;

  &:first-child {
    border-left-width: 1px;
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }
`;

const ModalAddToCartButton = styled.button`
  align-items: center;
  background: #5978f3;
  border: 1px solid #5978f3;
  border-radius: 4px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.1);
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1.125em;
  font-weight: 600;
  justify-content: center;
  outline: none;
  padding: 1rem 1.5rem;
  text-decoration: none;

  &:hover {
    background: ${lighten(0.1, '#5978f3')};
    border-color: ${lighten(0.1, '#5978f3')};
  }

  &:focus {
    background: ${lighten(0.1, '#5978f3')};
    border-color: ${lighten(0.1, '#5978f3')};
  }

  @media (max-width: 992px) {
    padding: 0.75rem 1.5rem;
  }
`;

const ModalShirtShippingInfo = styled.p`
  color: rgba(0,0,0,0.6);
  font-size: 0.875rem;
`;

export {
  ModalWrapper,
  OffScreenHDShirtRender,
  TemporaryShirtImage,
  TempShirtContent,
  ModalUnderlay,
  PreviewModalContainer,
  PreviewModal,
  ModalHeader,
  ModalHeading,
  ModalContainer,
  ModalShirtImageContainer,
  ShirtImageAction,
  UnloadedShirtContainer,
  Loader,
  ShirtImage,
  ShirtImageContent,
  ShirtImageHeader,
  ShirtImageDivider,
  ShirtImageBranding,
  ShirtImageDescription,
  ModalContent,
  ModalShirtName,
  ModalShirtDescription,
  ModalShirtPrice,
  ModalActions,
  ModalButtonGroup,
  ModalButtonGroupButton,
  ModalAddToCartButton,
  ModalShirtShippingInfo,
};
