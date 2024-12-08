// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Account from './views/Account';
import Bookmark from './views/Bookmark';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userAccount" element={<Account />} />
            <Route path="/bookmark" element={<Bookmark />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
