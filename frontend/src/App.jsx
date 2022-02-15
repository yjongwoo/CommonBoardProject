import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Board from './Board'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route path="/board" element={<Board />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </BrowserRouter>
)

export default App
