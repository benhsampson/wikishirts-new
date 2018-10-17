import React from 'react';
import PropTypes from 'prop-types';
// import ReactImageMagnify from 'react-image-magnify';
import html2canvas from 'html2canvas';
import moment from 'moment';

import close from '../../../../assets/close.svg';
import addShoppingCart from '../../../../assets/add-shopping-cart-white.svg';

import shirtSizes from '../../../../constants/shirt-sizes';

import { convertToDollars, formatAsCurrency } from '../../../../utils/currency';

import {
  ModalWrapper,
  OffScreenHDShirtRender,
  // TemporaryShirtImage,
  TempShirtContent,
  TempShirtHeader,
  TempShirtDivider,
  TempShirtBranding,
  TempShirtDescription,
  ModalUnderlay,
  PreviewModalContainer,
  PreviewModal,
  ModalHeader,
  ModalHeading,
  ModalContainer,
  ModalShirtImageContainer,
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

  componentDidMount() {
    this.convertDOMToImage();
  }

  convertDOMToImage = () => {
    const node = document.getElementById('shirt-node');

    setTimeout(() => {
      html2canvas(node, { backgroundColor: null }).then((canvas) => {
        this.mergeImages(['/images/shirt.png', canvas.toDataURL()])
          .then(async (b64) => {
            console.log('MERGED IMAGES SUCCESSFULLLY');

            // Display the image merger
            const image = new Image();

            image.src = b64;
            image.alt = 'Image after conversion from canvas';
            image.width = 300;
            image.height = 300;

            document.getElementById('paste-shirt').appendChild(image);

            // Upload the image to S3
            const currentDate = moment().format('MMM YYYY');
            console.log(currentDate);
            const fileName = `${this.props.shirt.name} ${moment().format('MMM YYYY')}`;
            console.log(fileName);
            const contentType = 'image/png';
            console.log(b64);
            const dataUriResponse = await fetch(b64),
                  blob = await dataUriResponse.blob();
            console.log(blob);

            // const params = { Key: fileName, ContentType: contentType, Body: blob };

            console.log('MERGED IMAGES SUCCESSFULLY', fileName, contentType, blob);

            // const uploadResponse = await fetch('/api/upload-image', {
            //   method: 'POST',
            //   headers: {
            //     'content-type': 'application/json',
            //   },
            //   body: JSON.stringify({
            //     fileName,
            //     fileType: contentType,
            //     blob
            //   }),
            // });
            const uploadResponse = await fetch('/api/test');
            const uploadBody = await uploadResponse.json();

            if (uploadResponse.status !== 200) console.error(uploadResponse.message);

            console.log(uploadBody);

            const uploadData = uploadBody.data.data.returnData;
            const { signedRequest } = uploadData;

            console.log(uploadData, signedRequest);

            // TODO: Get the uploaded file from our AWS bucket using a fetch GET method request

            // bucket.upload(params, (err, data) => {
            //   if (err) {
            //     console.log(err);
            //   } else {
            //     console.log('UPLOADED', data);
            //   }
            // });
          })
          .catch((exception) => console.error(exception));
      });
    }, 2000);
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
          <TempShirtContent>
            <TempShirtHeader>{shirt.name}</TempShirtHeader>
            <TempShirtDivider />
            <TempShirtBranding>
              Copied from Wikipedia, pasted by Wikishirts
            </TempShirtBranding>
            <TempShirtDescription
              dangerouslySetInnerHTML={{ __html: shirt.content }}
            />
          </TempShirtContent>
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
                {/* <ReactImageMagnify {...{
                    smallImage: {
                    alt: 'White Shirt w/ custom content',
                    isFluidWidth: true,
                    src: 'https://res.cloudinary.com/dnjad71gj/image/upload/v1537218129/shirt-underlay-background_ddqrl8.png',
                  },
                  largeImage: {
                    width: 1400,
                    height: 2100,
                    src: 'https://res.cloudinary.com/dnjad71gj/image/upload/v1537218129/shirt-underlay-background_ddqrl8.png',
                  },
                  }}
                /> */}
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
