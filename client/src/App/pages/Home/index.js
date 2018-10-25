import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import axios from 'axios';

import {
  addToCart,
  removeFromCart,
  updateCartItem,
  emptyCartItems,
  changePreferredSize,
  handleAddressUpsert,
  updateAddressOptions,
  updateGrandTotal,
} from '../../../actions/cart';

import { required } from '../../../utils/validations';
import randomId from '../../../utils/random-id';

import shirtSizes from '../../../constants/shirt-sizes';
import shirtDescription from '../../../constants/shirt-description';
import shirtPrice from '../../../constants/shirt-price';
import popularTags from '../../../constants/popular-tags';

import purplePattern from '../../../assets/pattern-purple.svg';

import {
  Wrapper,
  BrandHeader,
  Shirts,
  ShirtsList,
  ShirtsListItem,
  ShirtName,
  ShirtDescription,
  ShirtPreviewButton,
} from './style';

import Context from '../../components/Context';
import Container from './Container';
import Modal from './Modal';
import Cart from './Cart';
import Hero from './Hero';
import FAQ from './FAQ';

const Home = (props) => (
  <Context.Consumer>
    {mixpanel => <Component mixpanel={mixpanel} {...props} />}
  </Context.Consumer>
);

class Component extends React.Component {
  state = {
    loading: false,
    error: '',
    search: '',
    shirts: [],
    tags: [],
    previewModalOpen: false,
    selectedShirtLoading: false,
    selectedShirt: {
      id: '',
      name: '',
      description: '',
      price: '',
      pageId: '',
    },
    cartOpen: false,
    step: 1,
    recentlyPurchasedShirts: [],
  };

  static propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      addedAt: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      size: PropTypes.object.isRequired,
    })).isRequired,
    address: PropTypes.shape({
      billing: PropTypes.shape({
        senderName: PropTypes.string.isRequired,
        streetAddress: PropTypes.string.isRequired,
        country: PropTypes.object.isRequired,
        stateProvince: PropTypes.object.isRequired,
        city: PropTypes.object.isRequired,
        zipPostal: PropTypes.string.isRequired,
      }),
      shipping: PropTypes.shape({
        recipientName: PropTypes.string.isRequired,
        streetAddress: PropTypes.string.isRequired,
        country: PropTypes.object.isRequired,
        stateProvince: PropTypes.object.isRequired,
        city: PropTypes.object.isRequired,
        zipPostal: PropTypes.string.isRequired,
      }),
    }),
    addressOptions: PropTypes.shape({
      countryOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
      billingStateProvinceOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
      billingCityOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
      shippingStateProvinceOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
      shippingCityOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    preferredSize: PropTypes.string.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    handleAddressUpsert: PropTypes.func.isRequired,
    updateAddressOptions: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.updateGrandTotal();
    this.setState({ tags: popularTags });
  }

  search = () => {
    if (!this.state.loading) {
      if (required(this.state.search)) {
        this.setState({ loading: true });

        this.findAndParseArticles()
          .then(shirts => {
            if (shirts.length) {
              this.setState({ loading: false, error: '', shirts }, () => {
                scrollToComponent(this.shirts, { offset: 1, align: 'top', duration: 800, ease: 'inOutSine' });

                if (process.env.NODE_ENV === 'production')
                  this.props.mixpanel.track('Search successful', { searchTerm: this.state.search });
              });
            } else {
              this.setState({
                loading: false,
                error: '* No results found, please try something else',
              }, () => {
                if (process.env.NODE_ENV === 'production')
                  this.props.mixpanel.track('Search unsuccessful', { searchTerm: this.state.search });
              });
            }
          })
          .catch(err => this.setState({
            error: '* Couldn\'t load any shirts, please try again',
            loading: false,
          }, () => {
            if (process.env.NODE_ENV === 'production')
              this.props.mixpanel.track('Search unsuccessful', { searchTerm: this.state.search });
          }));
      } else {
        this.setState({ error: '* Please type something here' }, () => {
        })
      }
    }
  };

  findAndParseArticles = async () => {
    axios.get('https://guarded-headland-87063.herokuapp.com/api?search=pewdiepie')
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));

    // const response = await fetch(`https://guarded-headland-87063.herokuapp.com/api?search=${this.state.search}`);
    // axios.get(`https://guarded-headland-87063.herokuapp.com/api?search=${this.state.search}`)
    //   .then((response) => {
    //     console.log('RESPONSE', response);
    //     return response;
    //   })
    //   .catch((error) => {
    //     console.log('ERROR', error);
    //     throw Error(error);
    //   });
  };

  changeSelectedShirt = async (name) => {
    this.setState({
      selectedShirtLoading: true,
      selectedShirt: {
        name: name,
        description: shirtDescription,
        price: 0,
        pageId: 0,
      },
    });

    // const response = await fetch(`https://guarded-headland-87063.herokuapp.com/api/single?title=${name}`);
    // const body = await response.json();

    axios.get(`https://guarded-headland-87063.herokuapp.com/api/single?title=${name}`)
      .then((response) => {
        console.log('RESPONSE', response);

        // TODO: Overwriting price and description, this should be done on server
        this.setState({
          selectedShirtLoading: false,
          selectedShirt: {
            ...response,
            description: shirtDescription,
            price: shirtPrice,
          }
        }, () => this.convertDomToImage());
      })
      .catch((error) => {
        console.log('ERROR', error);

        throw Error(error);
      });
  };

  convertDomToImage = () => {
    console.log('Calling convert DOM function in modal');
    this.modal.convertDOMToImage();
  };

  changePreferredSize = newSize => this.props.changePreferredSize(newSize);

  addToCart = shirt => {
    this.props.addToCart({
      ...shirt,
      id: randomId(),
      addedAt: (new Date()).toISOString(),
      size: shirtSizes.find(({ value }) => value === this.props.preferredSize),
    });
    this.props.updateGrandTotal();

    if (process.env.NODE_ENV === 'production')
      this.props.mixpanel.track('Added item to cart', { itemName: shirt.name });
  };

  removeFromCart = shirtId => {
    this.props.removeFromCart(shirtId);
    this.props.updateGrandTotal();
  };

  updateCartItem = options => this.props.updateCartItem(options);

  cartIncrementStep = () => this.setState((prevState) => ({ step: prevState.step + 1 }));

  cartGoToStep = step => this.setState({ step });

  focusSearch = () => console.log(this.hero.current);

  handleAddressUpsert = options => {
    this.props.handleAddressUpsert(options)

    if (process.env.NODE_ENV === 'production')
      this.props.mixpanel.track('Filled out address information');
  };

  updateAddressOptions = options => this.props.updateAddressOptions(options);

  emptyCartItems = () => {
    this.setState({ recentlyPurchasedShirts: this.props.cartItems }, () => {
      this.props.emptyCartItems();
      this.props.updateGrandTotal();
    });
  };

  render() {
    const {
      cartItems,
      preferredSize,
      address,
      addressOptions,
      total,
      mixpanel,
    } = this.props;
    return (
      <Wrapper open={this.state.previewModalOpen || this.state.cartOpen}>
        <Cart
          open={this.state.cartOpen}
          step={this.state.step}
          cartItems={cartItems}
          total={total}
          address={address}
          addressOptions={addressOptions}
          recentlyPurchasedShirts={this.state.recentlyPurchasedShirts}
          incrementStep={this.cartIncrementStep}
          goToStep={this.cartGoToStep}
          removeFromCart={this.removeFromCart}
          updateCartItem={this.updateCartItem}
          openCart={() => this.setState({ cartOpen: true })}
          closeCart={() => {
            this.setState({ cartOpen: false, step: 1 });
          }}
          focusSearch={this.focusSearch}
          handleAddressUpsert={this.handleAddressUpsert}
          updateAddressOptions={this.updateAddressOptions}
          emptyCartItems={this.emptyCartItems}
          mixpanel={mixpanel}
        />
        {this.state.previewModalOpen && <Modal
          ref={node => (this.modal = node)}
          loading={this.state.selectedShirtLoading}
          shirt={this.state.selectedShirt}
          preferredSize={preferredSize}
          changePreferredSize={this.changePreferredSize}
          closeModal={() => this.setState({ previewModalOpen: false })}
          openModal={() => this.setState({ previewModalOpen: true })}
          addToCart={this.addToCart}
          openCart={() => this.setState({ cartOpen: true })}
        />}
        <BrandHeader src={purplePattern} />
        <Hero
          ref={node => (this.hero = node)}
          searchFunction={this.search}
          searchValue={this.state.search}
          searchLoading={this.state.loading}
          searchError={this.state.error}
          tags={this.state.tags}
          onChangeSearchValue={e => this.setState({ search: e.target.value })}
          onClickTag={(tag) => this.setState({ search: tag }, () => this.search())}
        />
        {this.state.shirts.length ? (
          <Shirts ref={node => (this.shirts = node)}>
            <Container>
              <ShirtsList>
                {this.state.shirts.map(({ name, description }, index) => (
                  <ShirtsListItem key={index}>
                    <ShirtName>{name}</ShirtName>
                    <ShirtDescription>{description}</ShirtDescription>
                    <ShirtPreviewButton
                      onClick={() => {
                        this.changeSelectedShirt(name);
                        this.setState({ previewModalOpen: true });
                      }}
                    >
                      Details
                    </ShirtPreviewButton>
                  </ShirtsListItem>
                ))}
              </ShirtsList>
            </Container>
          </Shirts>
        ) : ''}
        <FAQ />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.items,
  preferredSize: state.cart.preferredSize,
  address: state.cart.address,
  addressOptions: state.cart.addressOptions,
  total: state.cart.total,
});

export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
  updateCartItem,
  emptyCartItems,
  changePreferredSize,
  handleAddressUpsert,
  updateAddressOptions,
  updateGrandTotal,
})(Home);
