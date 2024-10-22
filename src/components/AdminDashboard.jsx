// src/components/AdminDashboard.js
import React from 'react';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import UploadData from './upload';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
      <button onClick={handleLogout} className="px-4 py-2 mb-4 text-white bg-red-500 rounded hover:bg-red-600">
        Logout
      </button>
      <UploadData />
    </div>
  );
}

export default AdminDashboard;