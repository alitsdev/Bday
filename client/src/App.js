import { useState } from 'react';
import Editor from './Pages/Editor';
import Login from './Pages/Login';
import PartyLandingPage from './Pages/Party-landing-page.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [userId, setUserId] = useState('alicia');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserId={setUserId} />} />
        <Route path={`/:${userId}/template`} element={<Editor />} />
        <Route path={`/:${userId}/invitation`} element={<PartyLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
