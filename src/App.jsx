import './index.css'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [word, setWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongGuessCount, setWrongGuessCount] = useState(0)

  const isGameWon = word.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= 8
  const isGameOver = isGameWon || isGameLost

  const wordElement = word.split("").map(letter => {
    return <span 
      key={uuidv4()}
      className='letter'
      >{guessedLetters.includes(letter) ? letter.toUpperCase() : ''}
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
  
  return (
    <main>
      <header className='header'>
        <h1>WORD MYSTERY</h1>
        <p>Guess the word in under 8 attempts</p>
      </header>

      <section 
        className='status'
        style={{
          display: isGameOver ? "block" : "none"
        }}
      >
        {isGameWon ? (
          <>
            <h3>You win!</h3>
            <h4>Well done! 🎉</h4>
          </>
        ) : isGameLost ? (
          <>
            <h3>Game Over!</h3>
            <h4>Better luck next time! 😊</h4>
          </>
        ) : null}
      </section>

      <section className='count'>
        <p>You have {8 - wrongGuessCount} wrong guess left!</p>
      </section>

      <section className='word'>
        {wordElement}
      </section>

      <section className="keyboard">
        {keyboardElement}
      </section>
    </main>
  )
}

export default App
