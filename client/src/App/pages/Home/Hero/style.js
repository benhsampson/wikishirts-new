import styled from 'styled-components';
import { lighten, transparentize } from 'polished';

const Wrapper = styled.section`
  background: #F3F7F9;
  width: 100%;
  padding: 5rem 0;

  @media (max-width: 992px) {
    padding: 3rem 0;
  }
`;

const ProductImage = styled.img`
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  margin-bottom: 5rem;
  width: 100%;
`;

const Headline = styled.h1`
  color: rgba(0,0,0,0.8);
  font-size: 1.75em;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 1rem;

  @media (max-width: 992px) {
    font-size: 1.6em;
  }
`;

const Emphasis = styled.span`
  color: #405DCF;
`;

const Subtitle = styled.h4`
  color: rgba(0,0,0,0.5);
  font-size: 1.2em;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const FormBlock = styled.div`
  display: flex;
  height: 4.5rem;
  margin-bottom: 2.5rem;
  font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  position: relative;

  @media (max-width: 992px) {
    flex-direction: column;
    height: auto;
  }
`;

const Input = styled.input`
  background: #FFFFFF;
  box-shadow: 0 8px 28px rgba(0,0,0,0.1);
  border: 1px solid #FFFFFF;
  border-right: 0;
  border-radius: 8px 0 0 8px;
  font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1.25em;
  flex: 1;
  min-width: 0;
  padding: 1rem 2rem;
  outline: none;

  @media (max-width: 992px) {
    border-radius: 8px;
    border-right: 1px solid #FFFFFF;
    margin-bottom: 1rem;
  }

  ::placeholder {
    color: rgba(0,0,0,0.4);
    font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
  }

  &:focus {
    border-color: #0635EC;
  }
`;

const SearchButton = styled.button`
  background: #5978f3;
  border: 1px solid #5978f3;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 8px 28px rgba(0,0,0,0.1);
  color: #FFFFFF;
  cursor: pointer;
  font-family: 'Inter UI', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1.25em;
  font-weight: 500;
  outline: none;
  padding: 1rem 2rem;

  &:hover {
    background: ${lighten(0.1, '#5978f3')};
    border-color: ${lighten(0.1, '#5978f3')};
  }

  &:focus {
    background: ${lighten(0.1, '#5978f3')};
    border-color: ${lighten(0.1, '#5978f3')};
  }

  @media (max-width: 992px) {
    border-radius: 8px;
  }
`;

const Error = styled.p`
  bottom: -2rem;
  color: #CC2B2B;
  font-size: 1em;
  right: 0;
  position: absolute;
`;

const Subtitle2 = styled.h6`
  color: rgba(0,0,0,0.4);
  font-size: 0.875em;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Tags = styled.div`
  display: flex;
  flex-flow: wrap;
  width: 100%;
  margin-bottom: -0.75rem;
`;

const Tag = styled.span`
  background: ${transparentize(0.94, '#405dcf')};
  border-radius: 4px;
  color: ${transparentize(0.4, '#405dcf')};
  cursor: pointer;
  font-size: 0.875em;
  font-weight: 500;
  margin: 0 0.75rem 0.75rem 0;
  padding: 0.5rem 1.5rem;
  text-align: center;

  &:hover {
    background: ${transparentize(0.92, '#405dcf')};
  }

  &:focus {
    background: ${transparentize(0.92, '#405dcf')};
  }

  @media (max-width: 992px) {
    flex: 1;
    margin: 0 1rem 1rem 0;
    padding: 0.625rem 1.5rem;
    white-space: nowrap;
  }
`;

const Disclaimer = styled.p`
  color: rgba(0,0,0,0.5);
  font-size: 0.875em;
  margin-top: 2rem;

  @media (max-width: 992px) {
    font-size: 0.9em;
    text-align: center;
  }
`;

export {
  Wrapper,
  ProductImage,
  Headline,
  Emphasis,
  Subtitle,
  FormBlock,
  Input,
  SearchButton,
  Error,
  Subtitle2,
  Tags,
  Tag,
  Disclaimer,
};
