import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './pages/header';
import Listings from './pages/listings';
import Treasury from './pages/treasury';
import Account from './pages/account';
import Create from './pages/create';
import NoPage from './pages/404';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Listings />} />
          <Route path="/treasury" element={<Treasury />} />
          <Route path="/account" element={<Account />} />
          <Route path="/create" element={<Create />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
