// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route exact path="/" element={<Login />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
