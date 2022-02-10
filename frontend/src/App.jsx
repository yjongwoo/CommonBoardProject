import React, {Component} from 'react'
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

class App extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route exact path='/' element={<SignIn/>}/>
                    <Route exact path='/signup' element={<SignUp/>}/>
                </Routes>
            </div>
        )
    }

}

export default App
