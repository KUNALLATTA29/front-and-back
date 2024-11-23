import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserManagement from './UserManagement';
import UserDetail from './User'; 

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<UserManagement />} />
            <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
    );
}
