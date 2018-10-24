import React from 'react';

import Container from '../Container';
import LinkInline from '../LinkInline';

import {
  Wrapper,
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
} from './style';

class Hero extends React.Component {
  render() {
    const {
      searchFunction,
      searchValue,
      onChangeSearchValue,
      searchLoading,
      searchError,
      tags,
      onClickTag,
    } = this.props;

    return (
      <Wrapper>
        <Container>
          {/* <ProductImage
            // TODO: replace this image
            src="https://images.pexels.com/photos/9816/pexels-photo-9816.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            alt="Product Image"
          /> */}
          <Headline>Wikishirts are <Emphasis>procedurally generated</Emphasis> T-shirts from Wikipedia.</Headline>
          <Subtitle>
            An huge selection of white shirts on any topic you like. It doesn’t matter if you’re a nerd,
            hacker, pyromaniac, Motorsport enthusiast, or Samurai sword
            collector, there’s a Wikishirt for that.
          </Subtitle>
          <form onSubmit={(e) => { e.preventDefault(); searchFunction(); }}>
            <FormBlock>
              <Input
                placeholder="What's your weird obsession?"
                onChange={e => onChangeSearchValue(e)}
                value={searchValue}
                ref={node => (this.search = node)}
              />
              <SearchButton>
                {!searchLoading ? 'Find me a shirt' : 'Searching...'}
              </SearchButton>
              {searchError && <Error>{searchError}</Error>}
            </FormBlock>
          </form>
          <Subtitle2>
            Popular searches
          </Subtitle2>
          <Tags>
            {tags.map((tag) => (
              <Tag
                key={tag}
                dangerouslySetInnerHTML={{ __html: tag }}
                onClick={() => onClickTag(tag)}
              />
            ))}
          </Tags>
          <Disclaimer>
            * All shirts cost $40 with free shipping worldwide
            <br />
            * Shirts that violate our <LinkInline to="/terms">terms of service</LinkInline> will be refunded and not printed
          </Disclaimer>
        </Container>
      </Wrapper>
    );
  }
}

export default Hero;
