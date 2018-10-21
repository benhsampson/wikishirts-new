import styled from 'styled-components';
import { lighten, darken } from 'polished';

const CartWrapper = styled.div`
  position: absolute;
`;

const CartButtonWrapper = styled.div`
  background: transparent;
  border: 0 0 0 4px;
  right: 1.5rem;
  position: fixed;
  top: 2rem;
  z-index: 9;
`;

const CartButton = styled.button`
  background: #24347C;
  border: 1px solid #24347C;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1.125em;
  font-weight: 500;
  outline: none;
  padding: 0.75rem 1.5rem;

  &:hover {
    background: ${lighten(0.075, '#24347C')};
    border-color: ${lighten(0.075, '#24347C')};
  }

  &:focus {
    background: ${lighten(0.075, '#24347C')};
    border-color: ${lighten(0.075, '#24347C')};
  }
`;

const CartUnderlay = styled.div`
  background: rgba(0,0,0,0.6);
  bottom: 0;
  height: 100vh;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  z-index: 8;
`;

const CartContainer = styled.div`
  background: #F5F5F5;
  bottom: 0;
  box-shadow: 0 0 32px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  max-width: 30rem;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 9;
`;

const CartHeader = styled.header`
  align-items: center;
  background: ${darken(0.3, '#405DCF')};
  display: grid;
  justify-content: space-between;
  grid-template-columns: 6rem 1fr 6rem;
  text-align: center;
  padding: 0.5rem 1.5rem;
  width: 100%;
`;

const CartHeaderTitle = styled.h3`
  color: #FFFFFF;
  font-size: 1.125em;
  font-weight: 500;
`;

const CartCount = styled.p`
  color: rgba(255,255,255,0.7);
  font-size: 1em;
  font-weight: 500;
  justify-self: flex-end;
`;

const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;

  @media (max-width: 992px) {
    overflow-y: auto;
  }
`;

const CartFooter = styled.footer`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem 1.5rem;
`;

const CartFooterPrompt = styled.p`
  color: rgba(0,0,0,0.6);
  margin-bottom: 1.25rem;
`;

const ButtonLink = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 4px;
  color: #405DCF;
  cursor: pointer;
  display: flex;
  font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1em;
  font-weight: 500;
  justify-content: center;
  outline: none;
  padding: 0.5rem 1rem;
  text-decoration: none;

  &:hover {
    background: rgba(0,0,0,0.05);
  }

  &:focus {
    background: rgba(0,0,0,0.05);
  }
`;

const BreadcrumbsContainer = styled.header`
  align-items: center;
  background: rgba(0,0,0,0.075);
  display: flex;
  min-height: 2.5rem;
  padding: 0.5rem 1.5rem;
  width: 100%;
`;

const Breadcrumb = styled.span`
  color: ${({ selected }) => selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.6)'};
  font-weight: ${({ selected }) => selected ? 500 : 400};
  cursor: ${({ previous }) => previous ? 'pointer' : 'text'};
`;

const BreadcrumbSeperator = styled.span`
  color: rgba(0,0,0,0.2);
  margin: 0 0.75rem;
`;

export {
  CartWrapper,
  CartButtonWrapper,
  CartButton,
  CartUnderlay,
  CartContainer,
  CartHeader,
  CartHeaderTitle,
  CartCount,
  CartContent,
  CartFooter,
  CartFooterPrompt,
  ButtonLink,
  BreadcrumbsContainer,
  Breadcrumb,
  BreadcrumbSeperator,
};
