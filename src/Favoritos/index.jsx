// Favoritos/index.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Favoritos() {
  const [favorites, setFavorites] = useState([])
  const [filter, setFilter] = useState('all') // all, alive, dead, unknown
  const navigate = useNavigate()

  // Cargar favoritos del localStorage
  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('rickMortyFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }

  // Eliminar de favoritos
  const removeFavorite = (characterId) => {
    const newFavorites = favorites.filter(fav => fav.id !== characterId)
    setFavorites(newFavorites)
    localStorage.setItem('rickMortyFavorites', JSON.stringify(newFavorites))
  }

  // Limpiar todos los favoritos
  const clearAllFavorites = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
      setFavorites([])
      localStorage.removeItem('rickMortyFavorites')
    }
  }

  // Filtrar favoritos por status
  const filteredFavorites = filter === 'all'
    ? favorites
    : favorites.filter(char => char.status.toLowerCase() === filter)

  // Estadísticas de favoritos
  const stats = {
    total: favorites.length,
    alive: favorites.filter(f => f.status === 'Alive').length,
    dead: favorites.filter(f => f.status === 'Dead').length,
    unknown: favorites.filter(f => f.status === 'unknown').length,
    human: favorites.filter(f => f.species === 'Human').length,
    alien: favorites.filter(f => f.species === 'Alien').length,
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>💜 Mis Personajes Favoritos</h1>
        <p className="favorites-subtitle">
          Tienes {stats.total} {stats.total === 1 ? 'personaje' : 'personajes'} en tu colección
        </p>
      </div>

      {favorites.length > 0 && (
        <>
          {/* Estadísticas */}
          <div className="favorites-stats">
            <div className="stat-card">
              <span className="stat-emoji">👽</span>
              <span className="stat-number">{stats.alien}</span>
              <span className="stat-label">Aliens</span>
            </div>
            <div className="stat-card">
              <span className="stat-emoji">👤</span>
              <span className="stat-number">{stats.human}</span>
              <span className="stat-label">Humanos</span>
            </div>
            <div className="stat-card alive">
              <span className="stat-emoji">✅</span>
              <span className="stat-number">{stats.alive}</span>
              <span className="stat-label">Vivos</span>
            </div>
            <div className="stat-card dead">
              <span className="stat-emoji">💀</span>
              <span className="stat-number">{stats.dead}</span>
              <span className="stat-label">Muertos</span>
            </div>
          </div>

          {/* Filtros */}
          <div className="favorites-filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos ({stats.total})
            </button>
            <button
              className={`filter-btn ${filter === 'alive' ? 'active' : ''}`}
              onClick={() => setFilter('alive')}
            >
              Vivos ({stats.alive})
            </button>
            <button
              className={`filter-btn ${filter === 'dead' ? 'active' : ''}`}
              onClick={() => setFilter('dead')}
            >
              Muertos ({stats.dead})
            </button>
            <button
              className={`filter-btn ${filter === 'unknown' ? 'active' : ''}`}
              onClick={() => setFilter('unknown')}
            >
              Desconocido ({stats.unknown})
            </button>

            <button
              className="clear-all-btn"
              onClick={clearAllFavorites}
            >
              🗑️ Limpiar Todo
            </button>
          </div>
        </>
      )}

      {filteredFavorites.length === 0 && favorites.length > 0 && (
        <div className="empty-filter">
          <p>No hay personajes con este filtro</p>
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">💔</div>
          <h2>No tienes favoritos aún</h2>
          <p>Ve a la página principal y agrega tus personajes favoritos</p>
          <button
            className="go-home-btn"
            onClick={() => navigate('/home')}
          >
            Explorar Personajes
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {filteredFavorites.map(character => (
            <div key={character.id} className="favorite-card">
              <button
                className="remove-favorite-btn"
                onClick={() => removeFavorite(character.id)}
                title="Eliminar de favoritos"
              >
                ✕
              </button>

              <img
                src={character.image}
                alt={character.name}
                className="favorite-image"
              />

              <div className="favorite-info">
                <h3>{character.name}</h3>
                <div className="favorite-details">
                  <span className={`status ${character.status.toLowerCase()}`}>
                    {character.status === 'Alive' ? '🟢' : character.status === 'Dead' ? '🔴' : '⚫'} {character.status}
                  </span>
                  <span className="species">{character.species}</span>
                </div>

                <div className="favorite-actions">
                  <button
                    className="view-details-btn"
                    onClick={() => navigate(`/detalle/${character.id}`)}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favoritos