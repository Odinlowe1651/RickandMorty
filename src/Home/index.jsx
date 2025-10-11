// Home/index.jsx - Versión actualizada con sistema de favoritos
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Home() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useState([])

  const navigate = useNavigate()

  // Cargar favoritos del localStorage al iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('rickMortyFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Función para cargar personajes
  const fetchCharacters = async (page = 1, search = '') => {
    setLoading(true)
    setError(null)
    try {
      let url = `https://rickandmortyapi.com/api/character?page=${page}`
      if (search) {
        url += `&name=${search}`
      }

      const response = await fetch(url)
      if (!response.ok) throw new Error('No se encontraron personajes')

      const data = await response.json()
      setCharacters(data.results)
      setTotalPages(data.info.pages)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
      setCharacters([])
    }
  }

  useEffect(() => {
    fetchCharacters(currentPage, searchTerm)
  }, [currentPage])

  // Función para buscar
  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchCharacters(1, searchTerm)
  }

  // Toggle favorito
  const toggleFavorite = (character) => {
    let newFavorites
    const isFavorite = favorites.some(fav => fav.id === character.id)

    if (isFavorite) {
      // Eliminar de favoritos
      newFavorites = favorites.filter(fav => fav.id !== character.id)
    } else {
      // Agregar a favoritos
      newFavorites = [...favorites, character]
    }

    setFavorites(newFavorites)
    localStorage.setItem('rickMortyFavorites', JSON.stringify(newFavorites))
  }

  // Verificar si es favorito
  const isFavorite = (characterId) => {
    return favorites.some(fav => fav.id === characterId)
  }

  // Navegación de páginas
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Rick and Morty Characters</h1>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>
      </div>

      {loading && (
        <div className="loading">
          <div className="portal-loader"></div>
          <p>Cargando personajes...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>😢 {error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="characters-grid">
            {characters.map(character => (
              <div key={character.id} className="character-card">
                {/* Botón de favorito */}
                <button
                  className={`favorite-btn ${isFavorite(character.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(character)
                  }}
                  aria-label="Agregar a favoritos"
                >
                  {isFavorite(character.id) ? '❤️' : '🤍'}
                </button>

                <img
                  src={character.image}
                  alt={character.name}
                  className="character-image"
                />
                <h3 className="character-name">{character.name}</h3>
                <div className="character-info">
                  <span className={`status-badge ${character.status.toLowerCase()}`}>
                    {character.status}
                  </span>
                  <span className="species-badge">{character.species}</span>
                </div>

                <button
                  className="details-btn"
                  onClick={() => navigate(`/detalle/${character.id}`)}
                >
                  Ver más
                </button>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Anterior
            </button>
            <span className="page-info">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Home