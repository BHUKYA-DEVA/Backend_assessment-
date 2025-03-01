import axios from 'axios';
import React, { useState } from 'react';

function SearchDiscussion() {
    const [text, setText] = useState('');
    const [discussions, setDiscussions] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:3000/discussions/searchByText?text=${text}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDiscussions(response.data.discussions);
        } catch (error) {
            console.error('Error searching discussions:', error);
        }
    };

    return (
        <div>
            <h2>Search Discussion</h2>
            <form onSubmit={handleSearch}>
                <div>
                    <label>Text:</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} required />
                </div>
                <button type="submit">Search</button>
            </form>
            {discussions.length > 0 && (
                <div>
                    <h3>Results:</h3>
                    <ul>
                        {discussions.map(discussion => (
                            <li key={discussion.id}>{discussion.text}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchDiscussion;
