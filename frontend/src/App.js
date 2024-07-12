// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MediaLayout from './pages/MediaLayout';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav>
                        <Link to="/">Home</Link> | <Link to="/media">Media Player</Link>
                    </nav>
                </header>
                <Routes>
                    <Route path="/media" element={<MediaLayout/>} />
                    <Route path="/" component={HomePage} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
