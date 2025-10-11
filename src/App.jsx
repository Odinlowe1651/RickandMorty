// App.jsx
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Informativa from './Informativa'
import Detalle from './Detalle'
import Favoritos from './Favoritos'
import Home from './Home'
import Original from './Original'

function App() {

  return (
    <>
    <Router>

        <nav className="c-menu">
          <Link to="/Home">Home</Link>
          <Link to="/Informativa">Informativa</Link>
          <Link to="/Original">TCG Battle</Link>
          <Link to="/Favoritos">Favoritos</Link>
          <Link to="/Detalle">Detalle</Link>

          <a
            href="https://www.netflix.com/co/title/80014749"
            target="_blank"
            rel="noopener noreferrer"
            className="netflix-btn"
          >
            <span className="netflix-icon">N</span>
            Ver en Netflix
          </a>
        </nav>

      <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/Home" element={<Home /> } />
          <Route path="/informativa" element={<Informativa /> } />
          <Route path="/Original" element={<Original /> } />
          <Route path="/Favoritos" element={<Favoritos /> } />
          <Route path="/detalle/:id" element={<Detalle /> } />
      </Routes>
    </Router>

    </>
  )
}

export default App
