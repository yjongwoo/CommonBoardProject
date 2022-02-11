/**
 * SignUp page
 * - email input
 * - password input
 * - nickname input
 * - register button
 */

import SignUp from "./SignUp.jsx";
import {fireEvent, render, waitFor} from "@testing-library/react";
import * as HttpClient from './HttpClient'
// import App from "./App";
import {MemoryRouter} from "react-router-dom";

describe('SignUp page rendering', () => {

    let page
    beforeEach(() => {
        page = render(<SignUp />)
    });

    it('There is "Sign up" text', () => {
        expect(page.getByText('Sign up')).toBeInTheDocument()
    });

    it('There are email, password, nickname labels and inputs', () => {
        const inputTypes = ['email', 'password', 'text']
        const labelNames = ['email', 'password', 'nickname']


        const labelElements = page.container.querySelectorAll('label')
        const inputElements = page.container.querySelectorAll('input')


        expect(labelElements.length).toBe(3)
        expect(inputElements.length).toBe(3)
        labelElements
            .forEach((labelElement, index) => {
                expect(labelElement.textContent).toBe(labelNames[index])
            })
        inputElements
            .forEach((inputElement, index) => {
                expect(inputElement.type).toBe(inputTypes[index])
            })
    });

    it('There is sign up button with correct text', () => {
        expect(page.getByRole('button', {name:'Register'})).toHaveTextContent('Register')
    });
})

describe('Http communication', () => {
    it('When the register button is pressed, post register request send', () => {
        const page = render(<SignUp />)
        const spy = jest.spyOn(HttpClient, 'post')


        const formElement = page.getByRole('button', {name:'Register'})
        fireEvent.click(formElement)


        expect(spy).toHaveBeenCalled()
    });

    it('When the register button is pressed, email/password/nickname send to post', () => {
        const page = render(<SignUp />)
        const spy = jest.spyOn(HttpClient, 'post')
        const emailInputElement = page.getByLabelText('email')
        const passwordInputElement = page.getByLabelText('password')
        const nicknameInputElement = page.getByLabelText('nickname')
        const buttonElement = page.getByRole('button', {name:'Register'})


        fireEvent.change(emailInputElement, {target:{value:'email@gmail.com'}})
        fireEvent.change(passwordInputElement, {target:{value:'somePassword'}})
        fireEvent.change(nicknameInputElement, {target:{value:'someNickname'}})
        fireEvent.click(buttonElement)


        expect(spy).toHaveBeenCalledWith("/signup", {"email": "email@gmail.com", "nickname": "someNickname", "password": "somePassword"})
    });

    it('When the register button is pressed, move to sign in page', async () => {
        const mockedNavigate = () => jest.fn()

        jest.mock('react-router', () => ({
            ...jest.requireActual('react-router'),
            useNavigate: () => mockedNavigate
        }));


        jest.spyOn(HttpClient, 'post').mockResolvedValue({})
        jest.spyOn(HttpClient, 'get').mockResolvedValue({})
        const App = require('./App').default

        const app = render(<MemoryRouter initialEntries={[{pathname:'/signup'}]}><App /></MemoryRouter>)

        const formElement = app.getByRole('button', {name:'Register'})
        fireEvent.click(formElement)

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalled())
    });
});