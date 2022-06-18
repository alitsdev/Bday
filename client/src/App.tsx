// import { useState } from 'react';
import React from 'react';
import Login from './Pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Editor from './Pages/Editor';
import PartyLandingPage from './Pages/Party-landing-page';

type UserId = string;

const App = () => {
  const [userId, setUserId] = React.useState<UserId>('alicia');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserId={setUserId} />} />
        <Route
          path={`/:${userId}/template`}
          element={<Editor userId={userId} />}
        />
        <Route
          path={`/:${userId}/invitation`}
          element={<PartyLandingPage userId={userId} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
