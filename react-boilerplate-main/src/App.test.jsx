import { render } from '@testing-library/react'
import Sample from './components/Sample'

jest.mock('./components/Sample')

describe('substituting react component using jest.mock', () => {
  it('should render app with plain DOM', () => {
    Sample.mockImplementation(() => <div data-testid="sample">Some Sample</div>)
    const App = require('./App').default

    const app = render(<App />)

    expect(app.getByText('Some Sample')).toBeInTheDocument()
    expect(app.getByTestId('sample')).toBeInTheDocument()
  })

  it('should render app with with sample component', () => {
    const RealSample = jest.requireActual('./components/Sample').default
    Sample.mockImplementation(() => (
      <div data-testid="sample2">
        <RealSample />
      </div>
    ))
    const App = require('./App').default

    const app = render(<App />)

    expect(app.getByText(/Backend running on/)).toBeInTheDocument()
    expect(app.getByTestId('sample2')).toBeInTheDocument()
  })
})

xdescribe('substituting react component without using jest.mock', () => {
  // the following tests should be executed after removing line 4 `jest.mock('./components/Sample')`
  // this suite does not pass when both tests are executed at the same time
  // reason: could not find a way to restore mock before each test
  // related issue: https://github.com/facebook/jest/issues/2649
  it('should render app with plain DOM', () => {
    // jest.mock gets hoisted, therefore using require instead of import is key
    // use doMock before render occurs
    jest.doMock('./components/Sample', () => () => <div data-testid="sample">Some Sample</div>)
    const { default: App } = require('./App')

    const app = render(<App />)

    expect(app.getByText('Some Sample')).toBeInTheDocument()
    expect(app.getByTestId('sample')).toBeInTheDocument()
  })

  it('should render app with with sample component', () => {
    const RealSample = jest.requireActual('./components/Sample').default
    jest.doMock('./components/Sample', () => () => (
      <div data-testid="sample2">
        <RealSample />
      </div>
    ))
    const App = require('./App').default

    const app = render(<App />)

    expect(app.getByText(/Backend running on/)).toBeInTheDocument()
    expect(app.getByTestId('sample2')).toBeInTheDocument()
  })
})
