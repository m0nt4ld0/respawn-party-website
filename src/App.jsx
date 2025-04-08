import { useState } from 'react'
import './App.css'
import Footer from './layouts/Footer'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <Footer />
    </>
  )
}

export default App
