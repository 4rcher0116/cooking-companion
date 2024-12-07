// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Account from './views/Account';
import Bookmark from './views/Bookmark';
import Leaderboard from './views/Leaderboard'; // Import the new Leaderboard component
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userAccount" element={<Account />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/leaderboard" element={<Leaderboard />} /> {/* Add the new route for the leaderboard */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
