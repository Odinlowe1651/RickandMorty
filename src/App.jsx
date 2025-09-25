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
          <Link to="/Original">Original</Link>
          <Link to="/Favoritos">Favoritos</Link>
          <Link to="/Detalle">Detalle</Link>
        </nav>


      <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/informativa" element={<Informativa /> } />
          <Route path="/Original" element={<Original /> } />
          <Route path="/Favoritos" element={<Favoritos /> } />
          <Route path="/detalle/:depto/:municipio" element={<Detalle /> } />

      </Routes>
    </Router>

    </>
  )
}

export default App
