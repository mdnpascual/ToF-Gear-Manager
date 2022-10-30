import React from 'react';
import logo from './logo.svg';
import './App.css';
import {OCRPage} from './OCRPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <OCRPage />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
