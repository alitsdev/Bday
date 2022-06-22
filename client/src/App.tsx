// import { useState } from 'react';
import React from 'react';
import Login from './Pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Editor from './Pages/Editor';
import PartyLandingPage from './Pages/Party-landing-page';

type UserId = string;
type UserMail = string;
type UserName = string;

const App = () => {
  const [userId, setUserId] = React.useState<UserId>('');
  const [userMail, setUserMail] = React.useState<UserMail>('');
  const [userName, setUserName] = React.useState<UserName>('');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              setUserId={setUserId}
              setUserMail={setUserMail}
              setUserName={setUserName}
            />
          }
        />
        <Route
          path={`/:${userId}/template`}
          element={<Editor userId={userId} userMail={userMail} />}
        />
        <Route
          path={`/:${userId}/invitation`}
          element={<PartyLandingPage userId={userId} userMail={userMail} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
