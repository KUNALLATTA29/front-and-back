import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = 'http://localhost:9001';

export default function UserManagement() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${api}/getusers`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${api}/adduser`, { name, email, phone, password });
            setEmail('');
            setName('');
            setPassword('');
            setPhone('');
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${api}/deleteuser/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleDetail = (id) => {
        navigate(`/user/${id}`);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Add User</h1>
            <form onSubmit={handlePost}>
                <input
                    type="text"
                    required
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    required
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    required
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="number"
                    required
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit">Add User</button>
            </form>
            <h1>All Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <p>User ID: {user._id}</p>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                        <button onClick={() => handleDetail(user._id)}>Detail</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
