/* eslint import/no-extraneous-dependencies: ["off"] */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'core-js';

import 'font-awesome/css/font-awesome.min.css';

import '../src/theme-default/src/index.css';

import './styles/base.scss';
import './styles/prism.css';

import App from './page';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./page', () => {
    const App = require('./page').default;

    render(
      <AppContainer>
        <App />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
