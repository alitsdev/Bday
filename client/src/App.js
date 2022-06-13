import { useState } from 'react';
import './App.css';
import Editor from './components/editor';
import GuestManager from './components/guest-manager';
import Navbar from './components/navbar';
import Login from './components/Login';

// const localElements = localStorage.getItem('elements')
// let localElementsJson = localElements? JSON.parse(localElements) : []

// const localPartyDetails = localStorage.getItem('partyDetails')
// let localPartyDetailsJson = localElements? JSON.parse(localPartyDetails) : {name: 'NAME',
// age: 'age',
// date: 'date',
// time: 'time',
// address: 'address'}

function App() {
  const [userId, setUserId] = useState('')
  // const [elements, setElements] = useState(localElementsJson);
  // const [partyDetails, setPartyDetails] = useState(localPartyDetailsJson);
  // const [invitationURL, setInvitationURL] = useState('')


  return (
    <div className="App">
    <Login setUserId= {setUserId}/>
    <Navbar />
    <Editor userId = {userId}/>
    <GuestManager />
    </div>
  );
}

export default App;
