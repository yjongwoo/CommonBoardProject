import {fireEvent, render, waitFor} from "@testing-library/react";
import SignIn from "./SignIn";
import * as HttpClient from './HttpClient'
import {HashRouter, MemoryRouter} from "react-router-dom";
import App from "./App";

describe('Sign in page component', () => {
    it('There are "Sign in" related components in SignIn page', () => {
        const page = render(<SignIn />)
        const emailInputElement = page.getByLabelText('Email')
        const passwordInputElement = page.getByLabelText('Password')

        expect(page.getByRole('heading', {name:'Sign in'})).toBeInTheDocument()
        expect(page.getByRole('button', {name:'Sign in'})).toBeInTheDocument()
        expect(emailInputElement).toBeInTheDocument()
        expect(passwordInputElement).toBeInTheDocument()
        expect(emailInputElement.type).toBe('text')
        expect(passwordInputElement.type).toBe('password')
    });

    it('When Sign in button clicked, get request send with email, password', () => {
        const page = render(<SignIn />)
        const spy = jest.spyOn(HttpClient, 'post').mockResolvedValue({})

        fireEvent.change(page.getByLabelText('Email'), {target:{ value: 'email@gmail.com' }})
        fireEvent.change(page.getByLabelText('Password'), {target:{ value: 'somePassword' }})
        fireEvent.click(page.getByRole('button', {name: 'Sign in'}))

        expect(spy).toHaveBeenCalledWith("/signin", { email: 'email@gmail.com', password: 'somePassword' })
    });

    it('When email is not email format, fail to sign in', () => {
        const page = render(<SignIn />)
        const spy = jest.spyOn(HttpClient, 'post').mockResolvedValue({})

        fireEvent.change(page.getByLabelText('Email'), {target:{ value: 'email' }})
        fireEvent.change(page.getByLabelText('Password'), {target:{ value: 'somePassword' }})
        fireEvent.click(page.getByRole('button', {name: 'Sign in'}))

        expect(spy).not.toHaveBeenCalled()
        expect(page.getByText('Invalid email format')).toBeInTheDocument()
    });

    describe('password format', () => {
        let page, spy
        beforeEach(() => {
            page = render(<SignIn />)
            spy = jest.spyOn(HttpClient, 'post').mockResolvedValue({})

            fireEvent.change(page.getByLabelText('Email'), {target:{ value: 'email@gmail.com' }})
        })

        it('Too short, no special character, no uppercase character, no number', () => {
            fireEvent.change(page.getByLabelText('Password'), {target:{ value: 'aaaa' }})
            fireEvent.click(page.getByRole('button', {name: 'Sign in'}))

            expect(spy).not.toHaveBeenCalled()
            expect(page.getByText('Invalid password format')).toBeInTheDocument()
        });

        it('No special character, no uppercase character', () => {
            fireEvent.change(page.getByLabelText('Password'), {target:{ value: 'aabbcc22' }})
            fireEvent.click(page.getByRole('button', {name: 'Sign in'}))

            expect(spy).not.toHaveBeenCalled()
            expect(page.getByText('Invalid password format')).toBeInTheDocument()
        });
    });

    it('When sign in success, route to board page', async () => {
        const app = render(<HashRouter><App /></HashRouter>)
        const spy = jest.spyOn(HttpClient, 'post').mockResolvedValue({})

        fireEvent.change(app.getByLabelText('Email'), {target: {value: 'email@gmail.com'}})
        fireEvent.change(app.getByLabelText('Password'), {target: {value: 'aabbA1!s'}})
        fireEvent.click(app.getByRole('button', {name: 'Sign in'}))

        expect(spy).toHaveBeenCalled()
        await waitFor(() => {
            expect(app.getByText('자유게시판')).toBeInTheDocument()
        })
    });
})
