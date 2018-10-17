import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import countryStateCity from 'country-state-city';

import { required } from '../../../../../utils/validations';

import {
  Wrapper,
  BillingInfo,
  ShippingInfo,
} from './style';

import FormGroup, { FormField, Label, Input } from '../FormGroup';
import CartContinueButton from '../CartContinueButton';

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      addressOptions: props.addressOptions ? props.addressOptions : {
        countryOptions: [],
        billingStateProvinceOptions: [],
        billingCityOptions: [],
        shippingStateProvinceOptions: [],
        shippingCityOptions: [],
      },
      address: Object.keys(props.address).length ? props.address : {
        billing: {
          senderName: '',
          streetAddress: '',
          country: '',
          stateProvince: '',
          city: '',
          zipPostal: '',
        },
        shipping: {
          recipientName: '',
          streetAddress: '',
          country: '',
          stateProvince: '',
          city: '',
          zipPostal: '',
        },
      },
    };
  }

  static propTypes = {
    address: PropTypes.object.isRequired,
    addressOptions: PropTypes.object.isRequired,
    handleAddressUpsert: PropTypes.func.isRequired,
    updateAddressOptions: PropTypes.func.isRequired,
    incrementStep: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.setState({
      addressOptions: {
        ...this.state.addressOptions,
        countryOptions: countryStateCity.getAllCountries().map(({
          id,
          sortname,
          name,
        }) => ({
          id,
          value: sortname,
          label: name,
        })),
      },
    });
  }

  validate = () => {
    const {
      address: {
        billing,
        shipping,
      },
    } = this.state;

    if (required(billing.country)) {
      if (required(billing.stateProvince)) {
        if (required(billing.city)) {
          if (required(shipping.country)) {
            if (required(shipping.stateProvince)) {
              if (required(shipping.city)) {
                return true;
              } else {
                alert('Please enter a city under shipping');
              }
            } else {
              alert('Please enter a state or province under shipping');
            }
          } else {
            alert('Please enter a country under shipping');
          }
        } else {
          alert('Please enter a city under billing');
        }
      } else {
        alert('Please enter a state or province under billing');
      }
    } else {
      alert('Please enter a country under billing');
    }

    return false;
  };

  onSubmit = async () => {
    const { billing, shipping } = this.state.address;

    if (this.validate()) {
      this.props.handleAddressUpsert({ billing, shipping });
      this.props.updateAddressOptions(this.state.addressOptions);
      this.props.incrementStep();
    }
  };

  render() {
    const {
      addressOptions: {
        countryOptions,
        billingStateProvinceOptions,
        billingCityOptions,
        shippingStateProvinceOptions,
        shippingCityOptions,
      },
      address: {
        billing,
        shipping,
      },
    } = this.state;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.onSubmit();
      }}>
        <Wrapper>
          <BillingInfo>
            <FormGroup tight columns={2}>
              <FormField>
                <Label>Sender name</Label>
                <Input
                  required
                  name="billingSenderName"
                  value={billing.senderName}
                  onChange={(e) => {
                    this.setState({
                      address: {
                        billing: {
                          ...billing,
                          senderName: e.target.value,
                        },
                        shipping: {
                          ...shipping,
                          recipientName: e.target.value,
                        },
                      },
                    });
                  }}
                />
              </FormField>
              <FormField>
                <Label>Billing street address</Label>
                <Input
                  required
                  name="billingStreetAddress"
                  value={billing.streetAddress}
                  onChange={(e) => {
                    this.setState({
                      address: {
                        billing: {
                          ...billing,
                          streetAddress: e.target.value,
                        },
                        shipping: {
                          ...shipping,
                          streetAddress: e.target.value,
                        },
                      },
                    });
                  }}
                />
              </FormField>
            </FormGroup>
            <FormField gutterBottom>
              <Label>Country</Label>
              <Select
                name="billingCountry"
                value={billing.country}
                onChange={(selectedOption) => {
                  this.setState({
                    address: {
                      billing: {
                        ...billing,
                        country: selectedOption
                      },
                      shipping: {
                        ...shipping,
                        country: selectedOption,
                      },
                    },
                  }, () => {
                    const newOptions = countryStateCity.getStatesOfCountry(this.state.address.billing.country.id).map(({ id, name }) => ({
                      value: id,
                      label: name,
                    }));
                    this.setState({
                      addressOptions: {
                        ...this.state.addressOptions,
                        billingStateProvinceOptions: newOptions,
                        shippingStateProvinceOptions: newOptions
                      },
                    });
                  });
                }}
                options={countryOptions}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    text: 'orangered',
                    primary25: 'hotpink',
                    primary: 'black',
                  }
                })}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </FormField>
            <FormGroup tight columns={3}>
              <FormField>
                <Label>State / Province</Label>
                <Select
                  name="billingStateProvince"
                  value={billing.stateProvince}
                  onChange={(selectedOption) => {
                    this.setState({
                      address: {
                        billing: {
                          ...billing,
                          stateProvince: selectedOption
                        },
                        shipping: {
                          ...shipping,
                          stateProvince: selectedOption,
                        },
                      },
                    }, () => {
                      const newOptions = countryStateCity
                        .getCitiesOfState(this.state.address.billing.stateProvince.value)
                        .map(({ id, name }) => ({
                          value: id,
                          label: name,
                        }));
                      this.setState({
                        addressOptions: {
                          ...this.state.addressOptions,
                          billingCityOptions: newOptions,
                          shippingCityOptions: newOptions
                        },
                      });
                    });
                  }}
                  options={billingStateProvinceOptions}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      text: 'orangered',
                      primary25: 'hotpink',
                      primary: 'black',
                    }
                  })}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </FormField>
              <FormField>
                <Label>City</Label>
                <Select
                  name="billingCity"
                  value={billing.city}
                  onChange={(selectedOption) => {
                    this.setState({
                      address: {
                        billing: {
                          ...billing,
                          city: selectedOption
                        },
                        shipping: {
                          ...shipping,
                          city: selectedOption,
                        },
                      },
                    });
                  }}
                  options={billingCityOptions}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      text: 'orangered',
                      primary25: 'hotpink',
                      primary: 'black',
                    }
                  })}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </FormField>
              <FormField>
                <Label>Zip / Postal</Label>
                <Input
                  required
                  name="billingZipPostal"
                  value={billing.zipPostal}
                  onChange={(e) => {
                    this.setState({
                      address: {
                        billing: {
                          ...billing,
                          zipPostal: e.target.value,
                        },
                        shipping: {
                          ...shipping,
                          zipPostal: e.target.value,
                        },
                      },
                    });
                  }}
                />
              </FormField>
            </FormGroup>
          </BillingInfo>

          <ShippingInfo>
            <FormGroup tight columns={2}>
              <FormField>
                <Label>Recipient name</Label>
                <Input
                  required
                  name="shippingRecipientName"
                  value={shipping.recipientName}
                  onChange={(e) => this.setState({
                    address: {
                      ...this.state.address,
                      shipping: {
                        ...shipping,
                        recipientName: e.target.value,
                      },
                    },
                  })}
                />
              </FormField>
              <FormField>
                <Label>Shipping street address</Label>
                <Input
                  required
                  name="shippingStreetAddress"
                  value={shipping.streetAddress}
                  onChange={(e) => this.setState({
                    address: {
                      ...this.state.address,
                      shipping: {
                        ...shipping,
                        streetAddress: e.target.value,
                      },
                    },
                  })}
                />
              </FormField>
            </FormGroup>
            <FormField gutterBottom>
              <Label>Country</Label>
              <Select
                name="shippingCountry"
                value={shipping.country}
                onChange={(selectedOption) => this.setState({
                  address: {
                    ...this.state.address,
                    shipping: {
                      ...shipping,
                      country: selectedOption,
                    },
                  },
                }, () => {
                    this.setState({
                      addressOptions: {
                        ...this.state.addressOptions,
                        shippingStateProvinceOptions: countryStateCity
                          .getStatesOfCountry(this.state.address.shipping.country.id)
                          .map(({ id, name }) => ({
                            value: id,
                            label: name,
                          })),
                      },
                    });
                  })
                }
                options={countryOptions}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    text: 'orangered',
                    primary25: 'hotpink',
                    primary: 'black',
                  }
                })}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </FormField>
            <FormGroup tight columns={3}>
              <FormField>
                <Label>State / Province</Label>
                <Select
                  name="shippingStateProvince"
                  value={shipping.stateProvince}
                  onChange={(selectedOption) => this.setState({
                    address: {
                      ...this.state.address,
                      shipping: {
                        ...shipping,
                        stateProvince: selectedOption,
                      },
                    },
                  }, () => {
                      const citiesOfChosenState = countryStateCity
                        .getCitiesOfState(this.state.address.shipping.stateProvince.value);
                      this.setState({
                        addressOptions: {
                          ...this.state.addressOptions,
                          shippingCityOptions: citiesOfChosenState.map(({ id, name }) => ({
                            value: id,
                            label: name,
                          })),
                        },
                      });
                    })
                  }
                  options={shippingStateProvinceOptions}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      text: 'orangered',
                      primary25: 'hotpink',
                      primary: 'black',
                    }
                  })}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </FormField>
              <FormField>
                <Label>City</Label>
                <Select
                  name="shippingCity"
                  value={shipping.city}
                  onChange={(selectedOption) => this.setState({
                    address: {
                      ...this.state.address,
                      shipping: {
                        ...shipping,
                        city: selectedOption,
                      },
                    },
                  })}
                  options={shippingCityOptions}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      text: 'orangered',
                      primary25: 'hotpink',
                      primary: 'black',
                    }
                  })}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </FormField>
              <FormField>
                <Label>Zip / Postal</Label>
                <Input
                  required
                  name="shippingZipPostal"
                  value={shipping.zipPostal}
                  onChange={(e) => this.setState({
                    address: {
                      ...this.state.address,
                      shipping: {
                        ...shipping,
                        zipPostal: e.target.value,
                      },
                    },
                  })}
                />
              </FormField>
            </FormGroup>
          </ShippingInfo>
          <CartContinueButton type="submit">
            Continue
          </CartContinueButton>
      </Wrapper>
    </form>
    );
  }
}

export default Address;
