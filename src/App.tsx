import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
