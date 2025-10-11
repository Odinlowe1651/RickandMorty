// Home/index.jsx
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

  // Cargar favoritos del localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(savedFavorites)
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
      if (!response.ok) throw new Error('Error al cargar personajes')

      const data = await response.json()
      setCharacters(data.results)
      setTotalPages(data.info.pages)
    } catch (err) {
      setError(err.message)
      setCharacters([])
    } finally {
      setLoading(false)
    }
  }

  // Cargar personajes al montar el componente
  useEffect(() => {
    fetchCharacters(currentPage, searchTerm)
  }, [currentPage])

  // Manejar búsqueda
  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchCharacters(1, searchTerm)
  }

  // Manejar favoritos
  const toggleFavorite = (character) => {
    const updatedFavorites = favorites.some(fav => fav.id === character.id)
      ? favorites.filter(fav => fav.id !== character.id)
      : [...favorites, character]

    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  // Ver detalles del personaje
  const handleViewDetails = (id) => {
    navigate(`/detalle/${id}`)
  }

  if (loading) return <div className="loading">Cargando...</div>
  if (error) return <div className="error">Error: {error}</div>

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

      <div className="characters-grid">
        {characters.map(character => (
          <div key={character.id} className="character-card">
            <div className="character-image-container">
              <img
                src={character.image}
                alt={character.name}
                className="character-image"
              />
              <button
                className={`favorite-btn ${favorites.some(fav => fav.id === character.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(character)}
                aria-label="Agregar a favoritos"
              >
                ❤
              </button>
            </div>

            <div className="character-info">
              <h3 className="character-name">{character.name}</h3>
              <div className="character-details">
                <span className={`status-badge ${character.status.toLowerCase()}`}>
                  {character.status}
                </span>
                <span className="species">{character.species}</span>
              </div>
              <button
                className="details-btn"
                onClick={() => handleViewDetails(character.id)}
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Anterior
        </button>

        <span className="page-info">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default Home