import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { StripeProvider } from 'react-stripe-elements';

import { store, persistor } from '../store';

import Home from './pages/Home';
import Image from './pages/Image';

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
                  path="/image"
                  component={Image}
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
