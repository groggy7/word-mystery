import './index.css'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import getRandomWord from './wordlist';

function App() {
  const [word, setWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongGuessCount, setWrongGuessCount] = useState(0)

  const isGameWon = word.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= 8
  const isGameOver = isGameWon || isGameLost

  const wordElement = word.split("").map(letter => {
    const styles = {}
    if(isGameLost && !guessedLetters.includes(letter)) {
      styles.color = "#EC5D49"
    }

    return <span 
      key={uuidv4()}
      className='letter'
      style={styles}
      >{guessedLetters.includes(letter) || isGameOver ? letter.toUpperCase() : ''}
    </span>
  })

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const keyboardElement = alphabet.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = word.split("").includes(letter)
    const isDisabled = isGameOver || isGuessed

    const styles = {
      backgroundColor: isGuessed ? isCorrect ? "#10A95B" : "#EC5D49" : "",
      cursor: isDisabled ? "not-allowed" : "pointer"
    }

    return <button 
      key={uuidv4()}
      className='key'
      style={styles}
      onClick={() => addGuessedLetter(letter)}
      disabled={isDisabled}
    >{letter.toUpperCase()}
    </button>
  })

  function addGuessedLetter(letter) {
    !word.split("").includes(letter) ? setWrongGuessCount(prev => prev+1) : null
    setGuessedLetters(prev => [...prev, letter])
  }

  function startNewGame() {
    setGuessedLetters([])
    setWrongGuessCount(0)
    setWord(getRandomWord())
  }
  
  return (
    <main>
      <header className='header'>
        <h1>WORD MYSTERY</h1>
        <p>Guess the word in under 8 attempts</p>
      </header>

      <section 
        className='status'
        style={{
          display: isGameOver ? "block" : "none",
          backgroundColor: isGameWon ? "#10A95B" : isGameLost ? "#BA2A2A": null
        }}
      >
        {isGameWon ? (
          <>
            <h3>You win!</h3>
            <p>Well done! 🎉</p>
          </>
        ) : isGameLost ? (
          <>
            <h3>Game Over!</h3>
            <p>Better luck next time! 😊</p>
          </>
        ) : null}
      </section>

      <section className='count'>
        <p>You have {8 - wrongGuessCount} wrong guess left!</p>
      </section>

      <section className='word'>
        {wordElement}
      </section>

      <section className='keyboard'>
        {keyboardElement}
      </section>

      <section className='new-game'>
        {isGameOver &&
        <button 
          className="new-game-btn"
          onClick={startNewGame}
        >
          NEW GAME
        </button>}
      </section>
    </main>
  )
}

export default App
