import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/containers/App';
import registerServiceWorker from './js/lib/registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
