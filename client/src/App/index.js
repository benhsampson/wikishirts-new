import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { StripeProvider } from 'react-stripe-elements';

import { store, persistor } from '../store';

import Home from './pages/Home';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Shipping from './pages/legal/Shipping';
import Refunds from './pages/legal/Refunds';

class App extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* TODO: Replace this with environment variable */}
          <StripeProvider apiKey="pk_test_XzGZ592lSVY2gbFjGyMpxP4Z">
            <Router>
              <main>
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
              </main>
            </Router>
          </StripeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
