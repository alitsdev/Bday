import './App.css';
import Editor from './components/editor';
import GuestManager from './components/guest-manager';
import LandingPage from './components/landing-page';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
    <Navbar />
    <Editor />
    <LandingPage />
    <GuestManager />
    </div>
  );
}

export default App;
