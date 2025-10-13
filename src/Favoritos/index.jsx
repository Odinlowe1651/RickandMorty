// Favoritos/index.jsx - Completo con navegación a detalles
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Favoritos() {
  const [favorites, setFavorites] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  // Cargar favoritos del localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('rickMortyFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Eliminar un favorito
  const removeFavorite = (characterId) => {
    const updatedFavorites = favorites.filter(char => char.id !== characterId)
    setFavorites(updatedFavorites)
    localStorage.setItem('rickMortyFavorites', JSON.stringify(updatedFavorites))
  }

  // Limpiar todos los favoritos
  const clearAllFavorites = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
      setFavorites([])
      localStorage.removeItem('rickMortyFavorites')
    }
  }

  // Navegar a detalles
  const goToDetails = (characterId) => {
    navigate(`/detalle/${characterId}`)
  }

  // Filtrar favoritos
  const getFilteredFavorites = () => {
    let filtered = [...favorites]

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(char =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtrar por estado
    switch(filter) {
      case 'alive':
        return filtered.filter(char => char.status === 'Alive')
      case 'dead':
        return filtered.filter(char => char.status === 'Dead')
      case 'unknown':
        return filtered.filter(char => char.status === 'unknown')
      case 'human':
        return filtered.filter(char => char.species === 'Human')
      case 'alien':
        return filtered.filter(char => char.species === 'Alien')
      default:
        return filtered
    }
  }

  const filteredFavorites = getFilteredFavorites()

  // Calcular estadísticas
  const stats = {
    total: favorites.length,
    alive: favorites.filter(char => char.status === 'Alive').length,
    human: favorites.filter(char => char.species === 'Human').length,
    alien: favorites.filter(char => char.species === 'Alien').length
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>❤️ Mis Favoritos ❤️</h1>
        <p className="favorites-subtitle">
          Tu colección personal de personajes de Rick and Morty
        </p>
      </div>

      {favorites.length > 0 ? (
        <>
          {/* Estadísticas */}
          <div className="favorites-stats">
            <div className="stat-card">
              <span className="stat-emoji">📊</span>
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-card">
              <span className="stat-emoji">💚</span>
              <span className="stat-number">{stats.alive}</span>
              <span className="stat-label">Vivos</span>
            </div>
            <div className="stat-card">
              <span className="stat-emoji">👤</span>
              <span className="stat-number">{stats.human}</span>
              <span className="stat-label">Humanos</span>
            </div>
            <div className="stat-card">
              <span className="stat-emoji">👽</span>
              <span className="stat-number">{stats.alien}</span>
              <span className="stat-label">Aliens</span>
            </div>
          </div>

          {/* Controles */}
          <div className="favorites-controls">
            <div className="filter-container">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Todos
              </button>
              <button
                className={`filter-btn ${filter === 'alive' ? 'active' : ''}`}
                onClick={() => setFilter('alive')}
              >
                Vivos
              </button>
              <button
                className={`filter-btn ${filter === 'dead' ? 'active' : ''}`}
                onClick={() => setFilter('dead')}
              >
                Muertos
              </button>
              <button
                className={`filter-btn ${filter === 'human' ? 'active' : ''}`}
                onClick={() => setFilter('human')}
              >
                Humanos
              </button>
              <button
                className={`filter-btn ${filter === 'alien' ? 'active' : ''}`}
                onClick={() => setFilter('alien')}
              >
                Aliens
              </button>
            </div>

            <button className="clear-all-btn" onClick={clearAllFavorites}>
              🗑️ Borrar Todo
            </button>
          </div>

          {/* Grid de favoritos */}
          <div className="favorites-grid">
            {filteredFavorites.map(character => (
              <div key={character.id} className="favorite-card">
                <button
                  className="remove-favorite-btn"
                  onClick={() => removeFavorite(character.id)}
                  title="Eliminar de favoritos"
                >
                  ❌
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
                      {character.status === 'Alive' ? '🟢' : character.status === 'Dead' ? '🔴' : '⚪'} {character.status}
                    </span>
                    <span className="species">
                      {character.species}
                    </span>
                  </div>

                  {character.location && (
                    <p className="location-info">
                      📍 {character.location.name}
                    </p>
                  )}

                  <button
                    className="view-details-btn"
                    onClick={() => goToDetails(character.id)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredFavorites.length === 0 && favorites.length > 0 && (
            <div className="empty-favorites">
              <div className="empty-icon">🔍</div>
              <h2>No hay favoritos que coincidan con el filtro</h2>
              <p>Prueba con otro filtro o criterio de búsqueda</p>
            </div>
          )}
        </>
      ) : (
        <div className="empty-favorites">
          <div className="empty-icon">💔</div>
          <h2>No tienes favoritos aún</h2>
          <p>Explora personajes y marca tus favoritos con el corazón</p>
          <button
            className="go-home-btn"
            onClick={() => navigate('/home')}
          >
            Explorar Personajes
          </button>
        </div>
      )}
    </div>
  )
}

export default Favoritos