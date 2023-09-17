import { useState } from 'react';
import './App.css';
import Home from './Home';
import Header from './Header';

function App() {
  return (
    <>
      <Header />
      <div style={{ marginTop: 95 }}>
        <Home />
      </div>
    </>
  );
}

export default App;
