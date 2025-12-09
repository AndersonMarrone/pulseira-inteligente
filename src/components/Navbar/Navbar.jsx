import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <i className="fas fa-heartbeat"></i>
          Vida<span>ID</span>
        </Link>
        
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Início</a>
          <a href="#features" onClick={() => setMenuOpen(false)}>Funcionalidades</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>Como Funciona</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Preços</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contato</a>
        </div>
        
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
        
        <a href="#pricing" className="cta-button">
          <i className="fas fa-shopping-cart"></i>
          Adquirir Agora
        </a>
      </div>
    </nav>
  )
}

export default Navbar

