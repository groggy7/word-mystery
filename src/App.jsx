import './index.css'

function App() {
  return (
    <main>
      <header className='header'>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className='status'>
        <h3>You win!</h3>
        <h4>Well done! 🎉</h4>
      </section>

      <section className='count'>
        <p>You have 8 wrong guess left!</p>
      </section>

      <section className='word'>
        {letterElements}
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>
    </main>
  )
}

export default App
