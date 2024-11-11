import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Account from './views/Account';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userAccount" element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
