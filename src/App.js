import './index.css';
import React from 'react';
import './output.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/home.js';
import Chatbot from './page/chatbot.js'; // Ensure this component exists

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;