import { useState } from 'react'

const tg = window.Telegram.WebApp


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={()=>{tg.Close()}}>
          CLOSE TG
        </button>
    </>
  )
}

export default App
