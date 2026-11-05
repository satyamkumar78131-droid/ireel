import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Watch from './pages/Watch.jsx';
import Saved from './pages/Saved.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">Ireel</Link>
        <div className="nav-links">
          <Link to="/saved">Saved</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </>
  );
}