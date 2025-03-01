import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import CreateDiscussion from './components/CreateDiscussion';
import Login from './components/Login';
import SearchDiscussion from './components/SearchDiscussion';
import SearchUser from './components/SearchUser';
import Signup from './components/Signup';
import "./global.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-discussion" element={<CreateDiscussion />} />
        <Route path="/search-user" element={<SearchUser />} />
        <Route path="/search-discussion" element={<SearchDiscussion />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
