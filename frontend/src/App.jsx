import React from 'react'
import { Routes, Route } from 'react-router-dom'

import SignIn from './SignIn'
import SignUp from './SignUp'
import Board from './Board'

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/board" element={<Board />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App
