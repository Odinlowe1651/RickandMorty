// Informativa/index.jsx - Página con información sobre Rick and Morty
import { useState, useEffect } from 'react'
import './style.css'

function Informativa() {
  const [activeTab, setActiveTab] = useState('serie')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character')
      const data = await response.json()
      setStats({
        totalCharacters: data.info.count,
        totalPages: data.info.pages
      })
      setLoading(false)
    } catch (error) {
      console.error('Error fetching stats:', error)
      setLoading(false)
    }
  }

  const serieInfo = {
    creador: 'Justin Roiland y Dan Harmon',
    estreno: '2 de diciembre de 2013',
    temporadas: '7 temporadas (y contando)',
    episodios: '71+ episodios',
    genero: 'Comedia animada, Ciencia ficción, Aventura',
    duracion: '22 minutos por episodio',
    cadena: 'Adult Swim / HBO Max / Netflix',
    premios: '2 Premios Emmy, 1 Annie Award'
  }

  const curiosidades = [
    {
      id: 1,
      emoji: '🧪',
      titulo: 'Origen del Show',
      descripcion: 'Rick and Morty comenzó como una parodia de "Volver al Futuro" llamada "The Real Animated Adventures of Doc and Mharti".'
    },
    {
      id: 2,
      emoji: '🗣️',
      titulo: 'Voces Originales',
      descripcion: 'Justin Roiland era la voz original tanto de Rick como de Morty, creando conversaciones consigo mismo.'
    },
    {
      id: 3,
      emoji: '🌌',
      titulo: 'Multiverso Infinito',
      descripcion: 'La serie establece que existen infinitas dimensiones, siendo la principal la C-137.'
    },
    {
      id: 4,
      emoji: '🥒',
      titulo: 'Pickle Rick',
      descripcion: 'El episodio "Pickle Rick" ganó un Emmy y se convirtió en un fenómeno cultural.'
    },
    {
      id: 5,
      emoji: '🎮',
      titulo: 'Referencias Ocultas',
      descripcion: 'Cada episodio está lleno de referencias a películas, videojuegos y cultura pop.'
    },
    {
      id: 6,
      emoji: '🧠',
      titulo: 'Filosofía Profunda',
      descripcion: 'A pesar de su humor, la serie explora temas existenciales y filosóficos complejos.'
    }
  ]

  const personajesIconicos = [
    { nombre: 'Rick Sanchez', rol: 'Científico loco', frase: '"Wubba Lubba Dub Dub!"' },
    { nombre: 'Morty Smith', rol: 'Nieto ansioso', frase: '"Oh jeez, Rick!"' },
    { nombre: 'Summer Smith', rol: 'Hermana adolescente', frase: '"God, you guys are lame"' },
    { nombre: 'Beth Smith', rol: 'Veterinaria de caballos', frase: '"I\'m a horse surgeon"' },
    { nombre: 'Jerry Smith', rol: 'Padre inseguro', frase: '"Life is effort"' },
    { nombre: 'Mr. Meeseeks', rol: 'Ayudante temporal', frase: '"I\'m Mr. Meeseeks, look at me!"' }
  ]

  const temporadas = [
    { numero: 1, año: 2013, episodios: 11, destacado: 'Pilot, Rick Potion #9' },
    { numero: 2, año: 2015, episodios: 10, destacado: 'Total Rickall, The Wedding Squanchers' },
    { numero: 3, año: 2017, episodios: 10, destacado: 'Pickle Rick, The Ricklantis Mixup' },
    { numero: 4, año: 2019, episodios: 10, destacado: 'Edge of Tomorty, The Vat of Acid Episode' },
    { numero: 5, año: 2021, episodios: 10, destacado: 'Mort Dinner Rick Andre, Rickmurai Jack' },
    { numero: 6, año: 2022, episodios: 10, destacado: 'Solaricks, Ricktional Mortpoon\'s Rickmas Mortcation' },
    { numero: 7, año: 2023, episodios: 10, destacado: 'How Poopy Got His Poop Back, Fear No Mort' }
  ]

  return (
    <div className="informativa-container">
      <div className="info-header">
        <h1 className="info-title">🌌 Rick & Morty: La Guía Definitiva 🌌</h1>
        <p className="info-subtitle">Todo lo que necesitas saber sobre la serie más loca del multiverso</p>
      </div>

      {/* Tabs de navegación */}
      <div className="info-tabs">
        <button
          className={`tab-btn ${activeTab === 'serie' ? 'active' : ''}`}
          onClick={() => setActiveTab('serie')}
        >
          📺 La Serie
        </button>
        <button
          className={`tab-btn ${activeTab === 'curiosidades' ? 'active' : ''}`}
          onClick={() => setActiveTab('curiosidades')}
        >
          🎭 Curiosidades
        </button>
        <button
          className={`tab-btn ${activeTab === 'personajes' ? 'active' : ''}`}
          onClick={() => setActiveTab('personajes')}
        >
          👥 Personajes
        </button>
        <button
          className={`tab-btn ${activeTab === 'temporadas' ? 'active' : ''}`}
          onClick={() => setActiveTab('temporadas')}
        >
          📅 Temporadas
        </button>
      </div>

      {/* Contenido de las tabs */}
      <div className="tab-content">
        {activeTab === 'serie' && (
          <div className="serie-section">
            <div className="stats-overview">
              {loading ? (
                <p>Cargando estadísticas...</p>
              ) : (
                <div className="stats-cards">
                  <div className="stat-card-info">
                    <span className="stat-emoji">👤</span>
                    <span className="stat-number">{stats?.totalCharacters || '826'}</span>
                    <span className="stat-label">Personajes Totales</span>
                  </div>
                  <div className="stat-card-info">
                    <span className="stat-emoji">📺</span>
                    <span className="stat-number">71+</span>
                    <span className="stat-label">Episodios</span>
                  </div>
                  <div className="stat-card-info">
                    <span className="stat-emoji">🏆</span>
                    <span className="stat-number">2</span>
                    <span className="stat-label">Premios Emmy</span>
                  </div>
                  <div className="stat-card-info">
                    <span className="stat-emoji">🌍</span>
                    <span className="stat-number">∞</span>
                    <span className="stat-label">Dimensiones</span>
                  </div>
                </div>
              )}
            </div>

            <div className="serie-info-grid">
              <div className="info-card">
                <h2>📺 Información General</h2>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Creadores:</span>
                    <span className="info-value">{serieInfo.creador}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Estreno:</span>
                    <span className="info-value">{serieInfo.estreno}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Temporadas:</span>
                    <span className="info-value">{serieInfo.temporadas}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Género:</span>
                    <span className="info-value">{serieInfo.genero}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Duración:</span>
                    <span className="info-value">{serieInfo.duracion}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Plataformas:</span>
                    <span className="info-value">{serieInfo.cadena}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Premios:</span>
                    <span className="info-value">{serieInfo.premios}</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h2>🎯 Sinopsis</h2>
                <p className="synopsis">
                  Rick and Morty sigue las desventuras de Rick Sanchez, un científico alcohólico y nihilista,
                  y su bondadoso pero nervioso nieto Morty Smith. Juntos, viajan a través de dimensiones
                  infinitas usando el portal interdimensional de Rick, encontrándose con todo tipo de
                  criaturas extrañas y situaciones peligrosas mientras lidian con los problemas familiares
                  en casa.
                </p>
                <p className="synopsis">
                  La serie mezcla humor negro, ciencia ficción compleja y momentos sorprendentemente
                  emotivos, explorando temas como el existencialismo, el libre albedrío y las
                  consecuencias de jugar a ser Dios.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'curiosidades' && (
          <div className="curiosidades-section">
            <h2 className="section-title">🎭 Datos Curiosos y Trivia</h2>
            <div className="curiosidades-grid">
              {curiosidades.map(item => (
                <div key={item.id} className="curiosidad-card">
                  <div className="curiosidad-emoji">{item.emoji}</div>
                  <h3>{item.titulo}</h3>
                  <p>{item.descripcion}</p>
                </div>
              ))}
            </div>

            <div className="extra-facts">
              <h3>💡 ¿Sabías que...?</h3>
              <ul className="facts-list">
                <li>El eructo característico de Rick es improvisado y real</li>
                <li>Cada episodio tarda aproximadamente 9 meses en producirse</li>
                <li>La serie tiene su propio idioma alienígena traducible</li>
                <li>Existe un cómic oficial que expande el universo</li>
                <li>La salsa Szechuan de McDonald's volvió gracias a la serie</li>
                <li>El nombre "Morty" es una referencia a "Mortimer" de Disney</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'personajes' && (
          <div className="personajes-section">
            <h2 className="section-title">👥 Personajes Icónicos</h2>
            <div className="personajes-grid">
              {personajesIconicos.map((personaje, index) => (
                <div key={index} className="personaje-card">
                  <h3>{personaje.nombre}</h3>
                  <p className="personaje-rol">{personaje.rol}</p>
                  <p className="personaje-frase">"{personaje.frase}"</p>
                </div>
              ))}
            </div>

            <div className="personajes-extra">
              <h3>🌟 Menciones Honoríficas</h3>
              <div className="menciones-grid">
                <div className="mencion">Evil Morty - El antagonista definitivo</div>
                <div className="mencion">Birdperson - El mejor amigo de Rick</div>
                <div className="mencion">Mr. Poopybutthole - Ooh-wee!</div>
                <div className="mencion">Squanchy - El amigo fiel</div>
                <div className="mencion">Unity - La mente colmena</div>
                <div className="mencion">Scary Terry - "Bitch!"</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'temporadas' && (
          <div className="temporadas-section">
            <h2 className="section-title">📅 Todas las Temporadas</h2>
            <div className="temporadas-timeline">
              {temporadas.map(temp => (
                <div key={temp.numero} className="temporada-card">
                  <div className="temporada-header">
                    <span className="temporada-numero">Temporada {temp.numero}</span>
                    <span className="temporada-año">{temp.año}</span>
                  </div>
                  <div className="temporada-info">
                    <p><strong>Episodios:</strong> {temp.episodios}</p>
                    <p><strong>Destacados:</strong> {temp.destacado}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="future-info">
              <h3>🚀 El Futuro de Rick and Morty</h3>
              <p>Adult Swim ha confirmado que la serie continuará por muchas temporadas más,
                 con un pedido de 70 episodios adicionales. ¡El multiverso seguirá expandiéndose!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Informativa