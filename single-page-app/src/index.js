import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import { BrowserRouter } from 'react-router-dom';

const holder = document.getElementById('root');

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), holder);
registerServiceWorker();
