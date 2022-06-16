import { useState } from 'react';
import './App.css';
import Editor from './components/editor';
import Login from './components/Login';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PartyLandingPage from './components/party-landing-page';

function App() {
  const [userId, setUserId] = useState('alicia');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setUserId={setUserId} />} />
          <Route path={`/:${userId}/template`} element={<Editor />} />
          <Route
            path={`/:${userId}/invitation`}
            element={<PartyLandingPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
