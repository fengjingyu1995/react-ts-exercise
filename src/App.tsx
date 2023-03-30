import React from 'react';
import './App.css';
import MultiStepsForm from './pages/MultiStepsForm/MultiStepsForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Complete from './pages/Complete/PokemonForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MultiStepsForm />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </Router>
  );
}

export default App;
