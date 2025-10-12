// Detalle/index.jsx - Página completa de detalles del personaje
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './style.css'

function Detalle() {
  const [character, setCharacter] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCharacterDetails()
    checkIfFavorite()
  }, [id])

  const fetchCharacterDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
      const data = await response.json()
      setCharacter(data)

      // Obtener información de los primeros 5 episodios
      const episodePromises = data.episode.slice(0, 5).map(url =>
        fetch(url).then(res => res.json())
      )
      const episodeData = await Promise.all(episodePromises)
      setEpisodes(episodeData)
    } catch (error) {
      console.error('Error fetching character details:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkIfFavorite = () => {
    const savedFavorites = localStorage.getItem('rickMortyFavorites')
    if (savedFavorites) {
      const favoritesArray = JSON.parse(savedFavorites)
      setIsFavorite(favoritesArray.some(fav => fav.id === parseInt(id)))
    }
  }

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem('rickMortyFavorites')
    let favoritesArray = savedFavorites ? JSON.parse(savedFavorites) : []

    if (isFavorite) {
      favoritesArray = favoritesArray.filter(fav => fav.id !== character.id)
    } else {
      favoritesArray.push(character)
    }

    localStorage.setItem('rickMortyFavorites', JSON.stringify(favoritesArray))
    setIsFavorite(!isFavorite)
  }

  if (loading) {
    return (
      <div className="detail-container">
        <div className="loading">
          <div className="portal-loader"></div>
          <p>Cargando información del personaje...</p>
        </div>
      </div>
    )
  }

  if (!character) {
    return (
      <div className="detail-container">
        <div className="error-state">
          <h2>Personaje no encontrado</h2>
          <button onClick={() => navigate('/home')} className="back-btn">
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Volver
      </button>

      <div className="detail-content">
        <div className="detail-main">
          <div className="detail-image-section">
            <img
              src={character.image}
              alt={character.name}
              className="detail-image"
            />
            <button
              className={`favorite-detail-btn ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? '❤️ En Favoritos' : '🤍 Agregar a Favoritos'}
            </button>
          </div>

          <div className="detail-info-section">
            <h1 className="character-name">{character.name}</h1>

            <div className="character-badges">
              <span className={`status-badge ${character.status.toLowerCase()}`}>
                {character.status === 'Alive' ? '🟢' : character.status === 'Dead' ? '🔴' : '⚪'} {character.status}
              </span>
              <span className="species-badge">
                {character.species === 'Human' ? '👤' : '👽'} {character.species}
              </span>
              {character.type && (
                <span className="type-badge">{character.type}</span>
              )}
            </div>

            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Género</span>
                <span className="detail-value">
                  {character.gender === 'Male' ? '♂️ Masculino' :
                   character.gender === 'Female' ? '♀️ Femenino' :
                   character.gender === 'Genderless' ? '⚧ Sin género' :
                   '❓ Desconocido'}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Origen</span>
                <span className="detail-value">{character.origin.name}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Última ubicación</span>
                <span className="detail-value">{character.location.name}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Apariciones</span>
                <span className="detail-value">{character.episode.length} episodios</span>
              </div>
            </div>

            <div className="character-stats">
              <div className="stat-item">
                <span className="stat-icon">📺</span>
                <span className="stat-number">{character.episode.length}</span>
                <span className="stat-text">Episodios</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🌍</span>
                <span className="stat-number">{character.origin.name === 'unknown' ? '?' : '✓'}</span>
                <span className="stat-text">Origen conocido</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📍</span>
                <span className="stat-number">{character.location.name === 'unknown' ? '?' : '✓'}</span>
                <span className="stat-text">Ubicación</span>
              </div>
            </div>
          </div>
        </div>

        <div className="episodes-section">
          <h2 className="episodes-title">📺 Primeros episodios donde aparece</h2>
          <div className="episodes-grid">
            {episodes.map((episode) => (
              <div key={episode.id} className="episode-card">
                <div className="episode-number">E{episode.id}</div>
                <div className="episode-info">
                  <h4>{episode.name}</h4>
                  <p className="episode-code">{episode.episode}</p>
                  <p className="episode-date">📅 {episode.air_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detalle
