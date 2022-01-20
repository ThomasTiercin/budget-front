import React from 'react';
import { render } from 'react-dom';
import App from './App/route';
import Header from './App/Header';
import Footer from './App/Footer';
import reportWebVitals from './reportWebVitals';

render(
    <Header />,
    document.getElementById('header')
);
render (
    <App />,
    document.getElementById('root')
);
render (
    <Footer />,
    document.getElementById('footer')
);
reportWebVitals();