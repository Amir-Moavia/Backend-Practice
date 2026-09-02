import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import axios from 'axios';
import { useEffect } from 'react'


function App() {
  const [Jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get('/api/jokes')
    .then((response) => {
      setJokes(response.data)
    }).catch((error) =>{
      console.log(error)
    })
  })

  return (
    <>
     <h1>Hello there</h1>
     <p>Jokes : {Jokes.length}</p>

     {
        Jokes.map((Jokes,index) => {
          <div key={Jokes.id}>
            <h3>{}</h3>
          </div>
        })
     }
    </>
  )
}

export default App
