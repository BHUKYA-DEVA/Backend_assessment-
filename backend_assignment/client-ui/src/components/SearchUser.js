import axios from 'axios';
import React, { useState } from 'react';

function SearchUser() {
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:3000/users/search?name=${name}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    return (
        <div>
            <h2>Search User</h2>
            <form onSubmit={handleSearch}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <button type="submit">Search</button>
            </form>
            {users.length > 0 && (
                <div>
                    <h3>Results:</h3>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>{user.name} - {user.email}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchUser;
