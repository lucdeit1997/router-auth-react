import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import DemoAuth from './components/DemoAuth';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DemoAuth/>
      </BrowserRouter>
    </div>
  );
}

export default App;
