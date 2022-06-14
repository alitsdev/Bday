import { useState } from 'react';
import './App.css';
import Editor from './components/editor';
import Login from './components/Login';

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";



function App() {
  const [userId, setUserId] = useState('')



  return (
    <Router>
    <div className="App">
    <Routes>
    <Route
    path = "/"
    element = {<Login setUserId= {setUserId}/>} />
    <Route path = "/:userId/template" element= {<Editor />}/>
    </Routes>
    </div>
    </Router>
  );
}

export default App;
