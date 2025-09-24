import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Ковалёв Андрей
          <br />
          <div>Цель: научиться создавать приложения на React.js с использованием SSR</div>
          <div>Стек: Vue 2/3, Quasar, Vuetify, JS, TS</div>
          <div>Опыт: 5 лет во frontend разработке</div>
        </p>
      </header>
    </div>
  );
}

export default App;
