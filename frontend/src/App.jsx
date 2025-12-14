import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavBar from './components/common/NavBar';
import Container from 'react-bootstrap/Container';
import Home from './pages/Home';
import Movies from './pages/Movies';
import People from './pages/People';
import './App.css';

// Placeholder Pages
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import PersonDetails from './pages/PersonDetails';
import Bookmarks from './pages/Bookmarks';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <AppNavBar />
        <Container className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/people" element={<People />} />
            <Route path="/people/:id" element={<PersonDetails />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
        <footer className="bg-dark text-white text-center py-3 mt-auto">
          <Container>
            <p className="mb-0">&copy; 2024 Movie App. All rights reserved.</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;
