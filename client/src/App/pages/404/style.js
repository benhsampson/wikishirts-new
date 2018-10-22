import styled from 'styled-components';

const Wrapper = styled.div`
  background: #F5F5F5;
  min-height: 100vh;
`;

const BrandHeader = styled.header`
  align-items: flex-end;
  background: ${({ src }) => `url(${src})`};
  display: flex;
  width: 100%;
  overflow: hidden;
  height: 0.625rem;
`;

const Container = styled.div`
  background: #FFF;
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;
  min-height: 100vh;
  padding: 5rem;
  position: relative;
`;

const Content = styled.div`
  font-size: 1em;
  margin: 0 auto;
  max-width: 680px;
  width: 100%;

  h1 {
    color: rgba(0,0,0,0.8);
    font-size: 3em;
    font-weight: 500;
    line-height: 1.3;
    margin-bottom: 1.5rem;
  }

  h2 {
    color: rgba(0,0,0,0.6);
    font-size: 1.5em;
    font-weight: 500;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  h6 {
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  p {
    color: rgba(0,0,0,0.7);
    font-size: 1.25em;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  em {
    color: rgba(0,0,0,0.5);
    font-style: italic;
  }

  a {
    color: #405dcf;
    font-weight: 500;
    display: inline-block;
    text-decoration: none;
  }
`;

export {
  Wrapper,
  BrandHeader,
  Container,
  Content,
};
