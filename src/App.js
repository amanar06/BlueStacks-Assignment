import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header'
import Campaigns from './Components/Campaigns/Campaigns'

function App() {
  const [lang, setLang] = useState('en')
  const changeLang = (selectedLanguage) => {
    setLang(selectedLanguage)
  }
  return (
    <div className="App">
      <Header lang={lang} changeLang={changeLang} />
      <Campaigns lang={lang} />
    </div>
  );
}

export default App;
