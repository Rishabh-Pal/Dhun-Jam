// import { useState } from 'react' 
import Login from './components/Login'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home'
import './App.css'

function App() { 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Home/>}  /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
