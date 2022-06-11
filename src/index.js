import React from 'react';
import ReactDOM from 'react-dom';
import { BlockMasterApp } from './BlockMasterApp';
import { Provider } from 'react-redux'
import { store } from '../src/store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BlockMasterApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
