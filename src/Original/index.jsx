// Original/index.jsx
import { useState, useEffect } from 'react'
import './style.css'

function Original() {
  const [allCharacters, setAllCharacters] = useState([])
  const [gameCharacters, setGameCharacters] = useState([])
  const [playerTeam, setPlayerTeam] = useState([])
  const [computerTeam, setComputerTeam] = useState([])
  const [gamePhase, setGamePhase] = useState('loading') // loading, selecting, battle, result
  const [winner, setWinner] = useState(null)
  const [playerStats, setPlayerStats] = useState({ total: 0 })
  const [computerStats, setComputerStats] = useState({ total: 0 })

  // Habilidades cómicas para los personajes
  const getCharacterAbility = (character) => {
  // Habilidades específicas para personajes principales
  const specificAbilities = {
    'Rick Sanchez': { name: 'Portal Borracho', description: 'Se escapa con un portal pero vuelve más ebrio (+50 ATK)' },
    'Morty Smith': { name: 'Ansiedad Extrema', description: 'Grita tan fuerte que aturde al enemigo (+30 DEF)' },
    'Summer Smith': { name: 'Instagram Influencer', description: 'Distrae al enemigo con selfies (-20 ATK enemigo)' },
    'Beth Smith': { name: 'Cirugía de Caballos', description: 'Cura heridas aleatorias (+40 HP)' },
    'Jerry Smith': { name: 'Ser Patético', description: 'Es tan patético que da pena atacarlo (+60 DEF)' },
    'Birdperson': { name: 'Vuelo Majestuoso', description: 'Esquiva todo por estar volando (+45 DEF)' },
    'Squanchy': { name: 'Squanchificar', description: 'Se transforma y squanchea todo (+70 ATK)' },
    'Mr. Poopybutthole': { name: 'Ooh-wee!', description: 'Anima tanto al equipo que todos mejoran (+25 ALL)' },
    'Evil Morty': { name: 'Manipulación', description: 'Controla mentes débiles (+80 ATK)' },
    'Mr. Meeseeks': { name: '¡Mírame!', description: 'Cumple una tarea y desaparece (+100 ATK, -100 HP)' },
    'Scary Terry': { name: 'Pesadilla Recurrente', description: 'Persigue en sueños diciendo "bitch" (+55 ATK)' },
    'Unity': { name: 'Asimilación Colectiva', description: 'Controla a todos al mismo tiempo (+70 ATK)' },
    'Abradolf Lincler': { name: 'Conflicto Interno', description: 'Lucha contra sí mismo confundiendo a todos (+40 DEF)' }
  }

  if (specificAbilities[character.name]) {
    return specificAbilities[character.name]
  }

  // Sistema dinámico basado en características del personaje
  const abilityBySpecies = {
    'Human': [
      { name: 'Drama Existencial', description: `${character.name} tiene una crisis y pelea con furia (+45 ATK)` },
      { name: 'Ingenio Humano', description: 'Usa herramientas improvisadas (+35 DEF)' },
      { name: 'Adrenalina', description: 'El miedo lo hace más fuerte (+40 ATK)' }
    ],
    'Alien': [
      { name: 'Tecnología Alienígena', description: 'Usa gadgets de su planeta (+50 ATK)' },
      { name: 'Fisiología Extraña', description: 'Su cuerpo raro lo hace resistente (+45 DEF)' },
      { name: 'Telepatía Espacial', description: 'Lee mentes y predice ataques (+40 DEF)' }
    ],
    'Humanoid': [
      { name: 'Mutación Ventajosa', description: 'Sus rarezas le dan poder (+45 HP)' },
      { name: 'Híbrido Poderoso', description: 'Lo mejor de dos mundos (+40 ATK)' },
      { name: 'Adaptación Rápida', description: 'Se adapta a cualquier situación (+35 DEF)' }
    ],
    'Robot': [
      { name: 'Actualización 2.0', description: 'Se mejora a sí mismo (+50 ATK)' },
      { name: 'Firewall Cuántico', description: 'Bloquea todos los ataques (+60 DEF)' },
      { name: 'Autorreparación', description: 'Se repara con chatarra (+45 HP)' }
    ],
    'Cronenberg': [
      { name: 'Mutación Grotesca', description: 'Es tan horrible que paraliza (+55 ATK)' },
      { name: 'Tentáculos', description: 'Ataca desde todas direcciones (+60 ATK)' },
      { name: 'Regeneración Aberrante', description: 'Regenera partes perdidas (+50 HP)' }
    ],
    'Mythological Creature': [
      { name: 'Poder Mítico', description: 'Invoca poderes antiguos (+65 ATK)' },
      { name: 'Bendición Divina', description: 'Los dioses lo protegen (+55 DEF)' },
      { name: 'Inmortalidad', description: 'Simplemente no muere (+70 HP)' }
    ],
    'Animal': [
      { name: 'Instinto Salvaje', description: 'Ataca con furia animal (+45 ATK)' },
      { name: 'Sentidos Agudos', description: 'Detecta peligros y los evade (+40 DEF)' },
      { name: 'Manada', description: 'Llama a sus amigos animales (+35 ATK)' }
    ]
  }

  // Habilidades por estado (status)
  const abilityByStatus = {
    'Alive': [
      { name: 'Ganas de Vivir', description: 'Lucha con todo para sobrevivir (+40 HP)' },
      { name: 'Vitalidad', description: 'Está lleno de energía (+35 ATK)' }
    ],
    'Dead': [
      { name: 'Ya Estoy Muerto', description: 'No le teme a nada (+60 ATK)' },
      { name: 'Fantasma Vengativo', description: 'Regresa del más allá (+50 DEF)' }
    ],
    'unknown': [
      { name: 'Schrödinger', description: 'Está vivo y muerto a la vez (+55 HP)' },
      { name: 'Misterio Cuántico', description: 'Nadie sabe qué es (+45 DEF)' }
    ]
  }

  // Habilidades por género
  const abilityByGender = {
    'Male': [
      { name: 'Masculinidad Tóxica', description: 'Golpea todo para demostrar que es fuerte (+40 ATK)' },
      { name: 'Barba Protectora', description: 'Su barba lo protege (+30 DEF)' }
    ],
    'Female': [
      { name: 'Furia Femenina', description: 'Desata su ira contenida (+45 ATK)' },
      { name: 'Multitarea', description: 'Hace mil cosas a la vez (+35 DEF)' }
    ],
    'Genderless': [
      { name: 'Sin Límites', description: 'Trasciende conceptos humanos (+50 ATK)' },
      { name: 'Forma Fluida', description: 'Cambia de forma a voluntad (+40 DEF)' }
    ],
    'unknown': [
      { name: 'Género Misterioso', description: 'Su misterio confunde (+35 DEF)' },
      { name: 'Identidad Secreta', description: 'Nadie sabe quién es realmente (+40 HP)' }
    ]
  }

  // Habilidades aleatorias divertidas
  const randomAbilities = [
    { name: 'Grito de Guerra', description: `Grita "${character.name} SMASH!" (+35 ATK)` },
    { name: 'Baile Intimidante', description: 'Baila tan mal que asusta (+30 DEF)' },
    { name: 'Chiste Malo', description: 'Cuenta chistes tan malos que dañan (+40 ATK)' },
    { name: 'Selfie Mortal', description: 'Toma selfies en plena batalla (+35 ATK)' },
    { name: 'Berrinche Cósmico', description: 'Hace un berrinche que destroza todo (+45 ATK)' },
    { name: 'Abrazo Incómodo', description: 'Da abrazos muy incómodos (+30 DEF)' },
    { name: 'Karaoke Dimensional', description: 'Canta tan mal que rompe dimensiones (+50 ATK)' },
    { name: 'Meme Viviente', description: 'Se vuelve viral y gana poder (+40 HP)' },
    { name: 'Procrastinación', description: 'Pospone el daño para después (+45 DEF)' },
    { name: 'Spoiler', description: 'Cuenta el final y arruina todo (+35 ATK)' },
    { name: 'Cringe Máximo', description: 'Es tan cringe que paraliza (+40 DEF)' },
    { name: 'Daddy Issues', description: 'Sus problemas paternales le dan fuerza (+45 ATK)' },
    { name: 'Síndrome del Impostor', description: 'Finge ser más fuerte (+35 HP)' },
    { name: 'Karen Mode', description: 'Pide hablar con el gerente (+50 ATK)' },
    { name: 'Friendzone', description: 'Pone a todos en la friendzone (+40 DEF)' }
  ]

  // Seleccionar habilidad basada en características disponibles
  let possibleAbilities = []

  // Agregar por especie
  if (character.species && abilityBySpecies[character.species]) {
    possibleAbilities.push(...abilityBySpecies[character.species])
  }

  // Agregar por estado
  if (character.status && abilityByStatus[character.status]) {
    possibleAbilities.push(...abilityByStatus[character.status])
  }

  // Agregar por género
  if (character.gender && abilityByGender[character.gender]) {
    possibleAbilities.push(...abilityByGender[character.gender])
  }

  // Si no hay habilidades específicas, usar las aleatorias
  if (possibleAbilities.length === 0) {
    possibleAbilities = randomAbilities
  } else {
    // Mezclar con algunas aleatorias para más variedad
    possibleAbilities.push(...randomAbilities.slice(0, 5))
  }

  // Seleccionar una habilidad usando el ID del personaje como seed para consistencia
  const index = (character.id * 13 + character.name.length * 7) % possibleAbilities.length
  return possibleAbilities[index]
}

  // Generar stats para cada personaje
  const generateCharacterStats = (character) => {
    const baseHP = 100 + (character.id * 7) % 150
    const baseATK = 50 + (character.id * 11) % 100
    const baseDEF = 30 + (character.id * 13) % 70
    const ability = getCharacterAbility(character)

    return {
      ...character,
      hp: baseHP,
      attack: baseATK,
      defense: baseDEF,
      total: baseHP + baseATK + baseDEF,
      ability: ability,
      selected: false
    }
  }

  // Cargar personajes iniciales
  useEffect(() => {
    fetchRandomCharacters()
  }, [])

  const fetchRandomCharacters = async () => {
    setGamePhase('loading')
    try {
      // Obtener una página aleatoria (hay 42 páginas en total)
      const randomPage = Math.floor(Math.random() * 42) + 1
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${randomPage}`)
      const data = await response.json()

      // Seleccionar 5 personajes aleatorios de esa página
      const shuffled = [...data.results].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 5)

      // Generar stats para cada personaje
      const charactersWithStats = selected.map(generateCharacterStats)

      setGameCharacters(charactersWithStats)
      setGamePhase('selecting')
      setPlayerTeam([])
      setComputerTeam([])
      setWinner(null)
    } catch (error) {
      console.error('Error fetching characters:', error)
    }
  }

  // Seleccionar personaje para el jugador
  const selectCharacter = (character) => {
    if (playerTeam.length >= 3) return
    if (playerTeam.find(c => c.id === character.id)) return

    const newTeam = [...playerTeam, character]
    setPlayerTeam(newTeam)

    // Si el jugador ya eligió 3, la computadora elige
    if (newTeam.length === 3) {
      selectComputerTeam()
    }
  }

  // Deseleccionar personaje
  const deselectCharacter = (characterId) => {
    setPlayerTeam(playerTeam.filter(c => c.id !== characterId))
  }

  // 2. Y aquí está la función selectComputerTeam SIN TRAMPA:
const selectComputerTeam = () => {
  // La computadora puede elegir de todos los personajes
  const availableCharacters = [...gameCharacters]

  // Separar personajes por poder
  const weakCharacters = availableCharacters.filter(c => c.total < 300)
  const strongCharacters = availableCharacters.filter(c => c.total >= 300)

  let computerSelection = []

  // ESTRATEGIA: Siempre tomar 2 personajes débiles (menos de 300)
  // Si hay personajes débiles disponibles, tomar 2
  if (weakCharacters.length >= 2) {
    // Tomar 2 aleatorios de los débiles
    const shuffledWeak = [...weakCharacters].sort(() => Math.random() - 0.5)
    computerSelection.push(shuffledWeak[0])
    computerSelection.push(shuffledWeak[1])
  } else if (weakCharacters.length === 1) {
    // Si solo hay 1 débil, tomarlo
    computerSelection.push(weakCharacters[0])
  }

  // Para el tercer personaje
  if (computerSelection.length < 3) {
    // 50% de probabilidad de elegir otro débil o uno fuerte
    const randomChoice = Math.random()

    if (randomChoice < 0.8 && weakCharacters.length > computerSelection.length) {
      // 70% de probabilidad: intenta elegir otro débil si hay
      const remainingWeak = weakCharacters.filter(
        w => !computerSelection.find(c => c.id === w.id)
      )
      if (remainingWeak.length > 0) {
        computerSelection.push(remainingWeak[0])
      } else {
        // Si no hay más débiles, toma el más débil de los fuertes
        const sortedStrong = [...strongCharacters].sort((a, b) => a.total - b.total)
        computerSelection.push(sortedStrong[0] || availableCharacters[0])
      }
    } else {
      // 30% de probabilidad: puede elegir uno fuerte
      if (strongCharacters.length > 0) {
        computerSelection.push(strongCharacters[Math.floor(Math.random() * strongCharacters.length)])
      } else {
        computerSelection.push(availableCharacters[Math.floor(Math.random() * availableCharacters.length)])
      }
    }
  }

  // Asegurarse de que tenga exactamente 3 personajes
  while (computerSelection.length < 3) {
    const remaining = availableCharacters.filter(
      c => !computerSelection.find(cs => cs.id === c.id)
    )
    if (remaining.length > 0) {
      computerSelection.push(remaining[0])
    
    }
  }

  setComputerTeam(computerSelection)
  setGamePhase('battle')
  calculateBattle(playerTeam, computerSelection)
}

  // Calcular batalla
  const calculateBattle = (playerT, computerT) => {
  // Calcular totales base
  const playerBaseTotal = playerT.reduce((sum, char) => {
    return sum + char.hp + char.attack + char.defense
  }, 0)

  const computerBaseTotal = computerT.reduce((sum, char) => {
    return sum + char.hp + char.attack + char.defense
  }, 0)

  // VENTAJAS PARA EL JUGADOR:
  // 1. Bonus del 15% por ser humano vs máquina
  const playerBonus = Math.floor(playerBaseTotal * 0.15)

  // 2. Factor aleatorio de suerte (0-50 puntos extra para el jugador)
  const luckFactor = Math.floor(Math.random() * 50)

  // 3. Penalización del 10% para la computadora
  const computerPenalty = Math.floor(computerBaseTotal * 0.10)

  // Totales finales
  const playerTotal = playerBaseTotal + playerBonus + luckFactor
  const computerTotal = computerBaseTotal - computerPenalty

  setPlayerStats({ total: playerTotal })
  setComputerStats({ total: computerTotal })

  setTimeout(() => {
    if (playerTotal > computerTotal) {
      setWinner('player')
    } else if (computerTotal > playerTotal) {
      setWinner('computer')
    } else {
      // En caso de empate, el jugador gana
      setWinner('player')
    }
    setGamePhase('result')
  }, 2000)
}

  // Reiniciar juego
  const resetGame = () => {
    fetchRandomCharacters()
  }

  return (
    <div className="original-container">
      <div className="game-header">
        <h1>🎮 Rick & Morty TCG Battle 🎮</h1>
        <p className="game-subtitle">¡Elige tu equipo de 3 personajes y batalla contra la máquina!</p>
      </div>

      {gamePhase === 'loading' && (
        <div className="loading-screen">
          <div className="portal-loader"></div>
          <p>Abriendo portal interdimensional...</p>
        </div>
      )}

      {gamePhase === 'selecting' && (
        <div className="selection-phase">
          <div className="selection-info">
            <h2>Selecciona 3 personajes para tu equipo</h2>
            <div className="team-counter">{playerTeam.length}/3 seleccionados</div>
          </div>

          <div className="characters-grid">
            {gameCharacters.map(character => {
              const isSelected = playerTeam.find(c => c.id === character.id)
              return (
                <div
                  key={character.id}
                  className={`character-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => isSelected ? deselectCharacter(character.id) : selectCharacter(character)}
                >
                  <div className="card-glow"></div>
                  <div className="card-header">
                    <img src={character.image} alt={character.name} />
                    <div className="card-rarity">
                      {character.total > 250 ? '⭐⭐⭐' : character.total > 200 ? '⭐⭐' : '⭐'}
                    </div>
                  </div>

                  <h3>{character.name}</h3>

                  <div className="stats-container">
                    <div className="stat">
                      <span className="stat-icon">❤️</span>
                      <span className="stat-value">{character.hp}</span>
                      <span className="stat-label">HP</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">⚔️</span>
                      <span className="stat-value">{character.attack}</span>
                      <span className="stat-label">ATK</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">🛡️</span>
                      <span className="stat-value">{character.defense}</span>
                      <span className="stat-label">DEF</span>
                    </div>
                  </div>

                  <div className="ability-box">
                    <div className="ability-name">{character.ability.name}</div>
                    <div className="ability-description">{character.ability.description}</div>
                  </div>

                  <div className="total-power">
                    <span>Poder Total: </span>
                    <strong>{character.total}</strong>
                  </div>

                  {isSelected && <div className="selected-badge">✓ Seleccionado</div>}
                </div>
              )
            })}
          </div>

          {playerTeam.length > 0 && (
            <div className="selected-team">
              <h3>Tu equipo:</h3>
              <div className="mini-team">
                {playerTeam.map(char => (
                  <div key={char.id} className="mini-card">
                    <img src={char.image} alt={char.name} />
                    <span>{char.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {gamePhase === 'battle' && (
        <div className="battle-phase">
          <h2>⚔️ ¡BATALLA EN PROGRESO! ⚔️</h2>
          <div className="battle-arena">
            <div className="team-display player-team">
              <h3>Tu Equipo</h3>
              <div className="team-cards">
                {playerTeam.map(char => (
                  <div key={char.id} className="battle-card">
                    <img src={char.image} alt={char.name} />
                    <p>{char.name}</p>
                    <div className="mini-stats">
                      <span>⚔️ {char.attack}</span>
                      <span>🛡️ {char.defense}</span>
                      <span>❤️ {char.hp}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="team-total">Total: {playerStats.total}</div>
            </div>

            <div className="vs-indicator">VS</div>

            <div className="team-display computer-team">
              <h3>Equipo Rival</h3>
              <div className="team-cards">
                {computerTeam.map(char => (
                  <div key={char.id} className="battle-card">
                    <img src={char.image} alt={char.name} />
                    <p>{char.name}</p>
                    <div className="mini-stats">
                      <span>⚔️ {char.attack}</span>
                      <span>🛡️ {char.defense}</span>
                      <span>❤️ {char.hp}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="team-total">Total: {computerStats.total}</div>
            </div>
          </div>
        </div>
      )}

      {gamePhase === 'result' && (
        <div className="result-phase">
          <div className={`result-banner ${winner}`}>
            {winner === 'player' && (
              <>
                <h1>🎉 ¡VICTORIA! 🎉</h1>
                <p>¡Tu equipo ha ganado con {playerStats.total} puntos contra {computerStats.total}!</p>
              </>
            )}
            {winner === 'computer' && (
              <>
                <h1>😢 DERROTA 😢</h1>
                <p>El equipo rival ganó con {computerStats.total} puntos contra tus {playerStats.total}</p>
              </>
            )}
            {winner === 'draw' && (
              <>
                <h1>🤝 ¡EMPATE! 🤝</h1>
                <p>Ambos equipos tienen {playerStats.total} puntos</p>
              </>
            )}
          </div>

          <div className="final-teams">
            <div className="final-team">
              <h3>Tu Equipo - {playerStats.total} pts</h3>
              <div className="final-cards">
                {playerTeam.map(char => (
                  <div key={char.id} className="final-card">
                    <img src={char.image} alt={char.name} />
                    <p>{char.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="final-team">
              <h3>Equipo Rival - {computerStats.total} pts</h3>
              <div className="final-cards">
                {computerTeam.map(char => (
                  <div key={char.id} className="final-card">
                    <img src={char.image} alt={char.name} />
                    <p>{char.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="play-again-btn" onClick={resetGame}>
            🎮 Jugar de Nuevo
          </button>
        </div>
      )}
    </div>
  )
}

export default Original