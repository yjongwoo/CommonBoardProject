import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Board from './Board'

class App extends Component {
  render() {
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
}

export default App
