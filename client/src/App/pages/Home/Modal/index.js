import React from 'react';
import PropTypes from 'prop-types';
import ReactImageMagnify from 'react-image-magnify';
import html2canvas from 'html2canvas';

import close from '../../../../assets/close.svg';
import addShoppingCart from '../../../../assets/add-shopping-cart-white.svg';

import shirtSizes from '../../../../constants/shirt-sizes';

import { convertToDollars, formatAsCurrency } from '../../../../utils/currency';

import {
  ModalWrapper,
  OffScreenHDShirtRender,
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
  // ShirtImage,
  // ShirtImageContent,
  // ShirtImageHeader,
  // ShirtImageDivider,
  // ShirtImageBranding,
  // ShirtImageDescription,
  ModalContent,
  ModalShirtName,
  ModalShirtDescription,
  ModalShirtPrice,
  ModalActions,
  ModalButtonGroup,
  ModalButtonGroupButton,
  ModalAddToCartButton,
  ModalShirtShippingInfo,
} from './style';

import IconButton from '../IconButton';
import Icon from '../Icon';
import LinkInline from '../LinkInline';

class Modal extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    shirt: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      pageId: PropTypes.number.isRequired,
    }),
    preferredSize: PropTypes.string.isRequired,
    changePreferredSize: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    openCart: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  state = {
    image: '',
  };

  convertDOMToImage = () => {
    const node = document.getElementById('shirt-node');

    const pTag = document.createElement('p');
    let innerHTML = this.props.shirt.text;

    const nameFinder = new RegExp(this.props.shirt.name, 'i');
    // Enlarge the name of the article
    innerHTML = innerHTML.replace(nameFinder, `<span class="name">${this.props.shirt.name}</span>`)

    for (let i = 0; i < this.props.shirt.links.length; i++) {
      if (innerHTML.includes(this.props.shirt.links[i])) {
        console.log('LINK THAT SHOWS UP', this.props.shirt.links[i]);
        console.log(innerHTML);
        const linkFinder = new RegExp(this.props.shirt.links[i], 'gi')
        innerHTML = innerHTML.replace(linkFinder, `<span class="link">${this.props.shirt.links[i]}</span>`);
      }
    }

    console.log('Testing'.replace('Test', ''));

    console.log('innerHTML', innerHTML);

    pTag.innerHTML = innerHTML;
    document.getElementById('shirt-content').appendChild(pTag);

    if (!this.props.loading) {
      html2canvas(node, { backgroundColor: null }).then((canvas) => {
        this.mergeImages(['/images/shirt.png', canvas.toDataURL()])
          .then(async (b64) => {
            console.log('MERGED IMAGES SUCCESSFULLLY');

            // Display the image merger
            const image = new Image();

            image.src = b64;
            // image.alt = 'Image after conversion from canvas';
            // image.width = 300;
            // image.height = 300;

            this.setState({ image: b64 });
          })
          .catch((exception) => console.error(exception));
      });
    }
  };

  mergeImages = (sources = []) => new Promise(resolve => {
    const canvas = document.createElement('canvas');

    const images = sources.map(source => new Promise((res, reject) => {
      if (source.constructor.name !== 'Object') source = { src: source };

      const img = new Image();
      img.src = source.src;
      img.width = 4000;
      img.height = 4000;
      img.onerror = () => reject(new Error('Could not load image'));
      img.onload = () => res(Object.assign({}, source, { img }));
    }));

    // use the canvas to draw the images on a final conversion canvas
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,200,0.5)';

    resolve(Promise.all(images)
      .then(images => {
        canvas.width = 4000;
        canvas.height = 4000;

        images.forEach(image => {
          return ctx.drawImage(image.img, 0, 0, 4000, 4000);
        });

        return canvas.toDataURL();
      }));
  });

  render() {
    const {
      loading,
      shirt,
      preferredSize,
      changePreferredSize,
      addToCart,
      openCart,
      closeModal,
    } = this.props;

    return (
      <ModalWrapper>
        <OffScreenHDShirtRender id="shirt-node">
          <TempShirtContent id="shirt-content" />
        </OffScreenHDShirtRender>
        <ModalUnderlay onClick={closeModal} />
        <PreviewModalContainer>
          <PreviewModal>
            <ModalHeader>
              <ModalHeading>
                Preview your custom shirt
              </ModalHeading>
              <IconButton compensateRight onClick={closeModal}>
                <Icon src={close} alt="Close preview modal" />
              </IconButton>
            </ModalHeader>
            <ModalContainer>
              <ModalShirtImageContainer id="paste-shirt">
                {this.state.image ? (
                  <ReactImageMagnify {...{
                    smallImage: {
                      alt: 'White Shirt w/ custom content',
                      isFluidWidth: true,
                      src: this.state.image,
                    },
                    largeImage: {
                      width: 1000,
                      height: 1000,
                      src: this.state.image,
                    },
                    }}
                  />
                ) : (
                  <UnloadedShirtContainer>
                    <Loader />
                    <img
                      src="/images/shirt.png"
                      alt="Shirt unloaded"
                      style={{ width: '100%' }}
                    />
                  </UnloadedShirtContainer>
                )}
                {/* Show the image merging happens */}
                {/* <ShirtImage>
                  <TemporaryShirtImage
                    src="https://res.cloudinary.com/dnjad71gj/image/upload/v1537218129/shirt-underlay-background_ddqrl8.png"
                    alt="White shirt with custom content"
                  />
                  <ShirtImageContent>
                    <ShirtImageHeader>{shirt.name}</ShirtImageHeader>
                    <ShirtImageDivider />
                    <ShirtImageBranding>
                      Copied from Wikipedia, pasted by Wikishirts
                    </ShirtImageBranding>
                    <ShirtImageDescription
                      dangerouslySetInnerHTML={{ __html: shirt.content }}
                    />
                  </ShirtImageContent>
                </ShirtImage> */}
                <ShirtImageAction>
                  {'Don\'t like this design? Suggest a new one by clicking on the contact button in the bottom right'}
                </ShirtImageAction>
              </ModalShirtImageContainer>
              <ModalContent>
                <ModalShirtName>{shirt.name}</ModalShirtName>
                <ModalShirtPrice>{formatAsCurrency(convertToDollars(shirt.price))}</ModalShirtPrice>
                <ModalShirtDescription dangerouslySetInnerHTML={{ __html: shirt.description }} />
                <ModalActions>
                  <ModalButtonGroup>
                    {shirtSizes.map(({ value, shorthand }) => (
                      <ModalButtonGroupButton
                        key={value}
                        selected={preferredSize === value}
                        onClick={() => changePreferredSize(value)}
                      >
                        {shorthand}
                      </ModalButtonGroupButton>
                    ))}
                  </ModalButtonGroup>
                  <ModalAddToCartButton
                    // disabled={loading}
                    onClick={() => {
                      if (!loading) {
                        addToCart(shirt);
                        closeModal();
                        openCart();
                      }
                    }}
                  >
                    <Icon spacingRight src={addShoppingCart} alt="Open shopping cart" />
                    Add to cart
                  </ModalAddToCartButton>
                </ModalActions>
                <ModalShirtShippingInfo>
                  We ship anywhere in the world for free.
                  <br />
                  Check out our <LinkInline to="shipping">shipping policy</LinkInline> for more info.
                </ModalShirtShippingInfo>
              </ModalContent>
            </ModalContainer>
          </PreviewModal>
        </PreviewModalContainer>
      </ModalWrapper>
    );
  }
}

export default Modal;
