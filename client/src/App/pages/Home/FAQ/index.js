import React from 'react';

import Container from '../Container';
import LinkInline from '../LinkInline';

import {
  Wrapper,
  FAQHeading,
  QA,
  QAsContainer,
  Question,
  Answer,
  B,
} from './style';

const FAQ = () => (
  <Wrapper>
    <Container>
      <FAQHeading>
        Frequently asked questions
      </FAQHeading>
      <QAsContainer>
        <QA>
          <Question>What exactly are you making?</Question>
          <Answer>
            An online store where users can search Wikipedia pages, pick an
            article they like, and purchase a shirt with basically the first
            section of the article on it. You don't have to design anything,
            that's literally it.
          </Answer>
        </QA>
        <QA>
          <Question>Why did you do this?</Question>
          <Answer>
            I think there are lots of people that have strange, non-mainstream
            interests, because completely personalized and tailor-made
            fashion isn't possible without coming at a premium. So I thought
            there would be demand for this kind of thing.
          </Answer>
        </QA>
        <QA>
          <Question>How does this work?</Question>
          <Answer>
            Like any other online store, except we get the shirt printed just
            after you order it on this website. We secure and encrypt all
            our payment, so nothing sketchy going on ;)
          </Answer>
        </QA>
        <QA>
          <Question>Where do you ship and how long does it take?</Question>
          <Answer>
            We ship internationally for free. It takes about <B>3-10</B>
            business days in the United States and <B>3-17</B> business days
            everywhere else in the world. See our <LinkInline to="/shipping">Shipping policy</LinkInline> for more.
          </Answer>
        </QA>
        <QA>
          <Question>What's the returns policy?</Question>
          <Answer>
            Return it if it isn't satisfactory. Go ahead and contact us (using the button in the bottom right corner), or check out our <LinkInline to="/refunds">Returns & Refunds Policy</LinkInline>.
          </Answer>
        </QA>
        <QA>
          <Question>How do you manage our privacy?</Question>
          <Answer>
            We use third parties like Stripe to store your payment information. Check out our <LinkInline to="/privacy">Privacy Policy</LinkInline>.
          </Answer>
        </QA>
        <QA>
          <Question>Is every Wikipedia article appropriate?</Question>
          <Answer>
            Probably not, there's definitely some profane stuff on at least one
            in those 5.7 million crowdsourced English Wikipedia articles out
            there. Luckily, we're not liable for what you choose to print a
            shirt from. :D <LinkInline to="/terms">Terms of service</LinkInline>
          </Answer>
        </QA>
      </QAsContainer>
    </Container>
  </Wrapper>
);

export default FAQ;
