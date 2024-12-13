import './index.css'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [word, setWord] = useState("react")

  const wordElement = word.split("").map(letter => {
    return <span key={uuidv4()} className='letter'>{letter.toUpperCase()}</span>
  })

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const keyboardElement = alphabet.split("").map(letter => {
    return <button key={uuidv4()} className='key'>{letter.toUpperCase()}</button>
  })

  return (
    <main>
      <header className='header'>
        <h1>WORD MYSTERY</h1>
        <p>Guess the word in under 8 attempts</p>
      </header>

      <section className='status'>
        <h3>You win!</h3>
        <h4>Well done! 🎉</h4>
      </section>

      <section className='count'>
        <p>You have 8 wrong guess left!</p>
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
