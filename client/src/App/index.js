import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { StripeProvider } from 'react-stripe-elements';
import mixpanel from 'mixpanel-browser';

import { store, persistor } from '../store';

import mixpanelToken from '../constants/mixpanel-token';
import stripePublicKey from '../constants/stripe-public-key';

import Home from './pages/Home';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Shipping from './pages/legal/Shipping';
import Refunds from './pages/legal/Refunds';
import NotFound from './pages/404';

import Context from './components/Context';

mixpanel.init(mixpanelToken);

console.log(process.env);

class App extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Context.Provider value={mixpanel}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* TODO: Replace this with environment variable */}
            <StripeProvider apiKey={stripePublicKey}>
              <Router>
                <main>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      component={Home}
                    />
                    <Route
                      exact
                      path="/privacy"
                      component={Privacy}
                    />
                    <Route
                      exact
                      path="/terms"
                      component={Terms}
                    />
                    <Route
                      exact
                      path="/shipping"
                      component={Shipping}
                    />
                    <Route
                      exact
                      path="/refunds"
                      component={Refunds}
                    />
                    <Route
                      component={NotFound}
                    />
                  </Switch>
                </main>
              </Router>
            </StripeProvider>
          </PersistGate>
        </Provider>
      </Context.Provider>
    );
  }
}

export default App;
