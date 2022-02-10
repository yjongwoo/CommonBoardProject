/**
 * SignUp page
 * - email input
 * - password input
 * - nickname input
 * - register button
 */

import SignUp from "./SignUp.jsx";
import {fireEvent, render} from "@testing-library/react";
import * as HttpClient from './HttpClient'

describe('SignUp page rendering', () => {

    let page
    beforeEach(() => {
        page = render(<SignUp />)
    });

    it('There is "Sign up" text', () => {
        //given
        // when
        const pageTitle = page.getByText('Sign up')

        // then
        expect(pageTitle).toBeInTheDocument()
    });

    it('There are email, password, nickname labels and inputs', () => {
        // given
        const inputTypes = ['email', 'password', 'text']
        const labelNames = ['email', 'password', 'nickname']

        // when
        const labelElements = page.container.querySelectorAll('label')
        const inputElements = page.container.querySelectorAll('input')

        // then
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
        // given
        // when
        const signUpButtonElement = page.getByTestId('signup-button')

        // then
        expect(signUpButtonElement).toHaveTextContent('Register')
    });
})

describe('Http communication', () => {
    it('When the register button is pressed, post register request send', () => {
        // given
        const page = render(<SignUp />)
        const spy = jest.spyOn(HttpClient, 'post')

        // when
        const formElement = page.getByTestId('signup-button')
        fireEvent.click(formElement)

        // then
        expect(spy).toHaveBeenCalled()
    });
});