import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Welcome to the React App</h1>
      <nav>
        <ul>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/create-discussion">Create Discussion</Link></li>
          <li><Link to="/search-user">Search User</Link></li>
          <li><Link to="/search-discussion">Search Discussion</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
