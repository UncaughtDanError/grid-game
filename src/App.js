import React from 'react';
import './App.css';
import Board from './Board.js';
import { useState } from 'react';

function App() {
  const [greeting, setGreeting] = useState('');

  const clickHandler = () => {
    fetch('http://localhost:3001/', {
      method: 'GET',
      mode: 'cors',
    })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    // .then((data) => document.querySelector('.data').innerText = data.greeting )
    .then((data) => setGreeting(data.greeting))
  }

  return (
    <div className="App">
      <h1 className='data'>{greeting}</h1>
      <button onClick={clickHandler}>Click me!</button>
      <Board />
    </div>
  );
}

export default App;
