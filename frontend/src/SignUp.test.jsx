/**
 * SignUp page
 * - email input
 * - password input
 * - nickname input
 * - register button
 */

import SignUp from "./SignUp.jsx";
import {render} from "@testing-library/react";

describe('SignUp page rendering', () => {
    it('There is "Sign up" text', () => {
        //given
        const page = render(<SignUp />)

        // when
        const pageTitle = page.getByText('Sign up')

        // then
        expect(pageTitle).toBeInTheDocument()
    });

    it('There are email, password, nickname labels and inputs', () => {
        // given
        const inputTypes = ['email', 'password', 'text']
        const inputNames = ['email', 'password', 'nickname']
        const page = render(<SignUp />)

        // when
        const labelElements = page.container.querySelectorAll('label')
        const inputElements = page.container.querySelectorAll('input')

        // then
        expect(labelElements.length).toBe(3)
        expect(inputElements.length).toBe(3)
        labelElements
            .forEach((labelElement, index) => {
                expect(labelElement.textContent).toBe(inputNames[index])
            })
        inputElements
            .forEach((inputElement, index) => {
                expect(inputElement.type).toBe(inputTypes[index])
            })
    });
})