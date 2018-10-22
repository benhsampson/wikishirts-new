import React from 'react';

import {
  Wrapper,
  BrandHeader,
  Container,
  Content,
} from './style';

import BackButton from '../../components/BackButton';
import LinkInline from '../Home/LinkInline';

import purplePattern from '../../../assets/pattern-purple.svg';

const NotFound = (props) => (
  <Wrapper>
    <BrandHeader src={purplePattern} />
    <Container>
      <Content>
        <BackButton onClick={() => props.history.push('/')} />
        <h1>404</h1>
        <h2>{'We sincerley apologize'}</h2>
        <p>The page you were looking for doesn't exist. Maybe it was never here in the first place. Sorry for this, probably a big inconvinence.</p>
        <LinkInline to="/">{'< Head back home'}</LinkInline>
      </Content>
    </Container>
  </Wrapper>
);

export default NotFound;
