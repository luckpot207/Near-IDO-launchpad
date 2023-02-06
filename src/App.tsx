import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header />
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/create" element={<Create />} />
        </Routes> */}
      </Router>
    </div>
  );
}

export default App;
