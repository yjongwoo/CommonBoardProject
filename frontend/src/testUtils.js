import { render } from '@testing-library/react'
import * as HttpClient from './HttpClient'
import userEvent from '@testing-library/user-event'

export const httpPostSpy = () => jest.spyOn(HttpClient, 'post').mockResolvedValue({})
export const expectText = (element, text) => expect(element.getByText(text)).toBeInTheDocument()
export const changeInputText = (element, value) => userEvent.type(element, value)
export const clickElement = (element) => userEvent.click(element)
export const getButtonByText = (element, name) => element.getByRole('button', { name })
export const clickButtonWithText = (element, name) => clickElement(getButtonByText(element, name))
export const changeInputTextByLabel = (element, label, value) => changeInputText(element.getByLabelText(label), value)
export const renderComponent = (componentPath, isWithRouter = false) => {
  const Component = require(componentPath).default
  if (isWithRouter) {
    const { MemoryRouter } = jest.requireActual('react-router-dom')

    return render(
      <MemoryRouter>
        <Component />
      </MemoryRouter>
    )
  }
  return render(<Component />)
}
