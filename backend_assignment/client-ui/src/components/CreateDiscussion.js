import axios from 'axios';
import React, { useState } from 'react';

function CreateDiscussion() {
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:3000/discussions',
                { text, image, tags: tags.split(',').map(tag => tag.trim()) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Discussion created:', response.data);
        } catch (error) {
            console.error('Error creating discussion:', error);
        }
    };

    return (
        <div>
            <h2>Create Discussion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Text:</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                <div>
                    <label>Tags (comma separated):</label>
                    <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateDiscussion;
