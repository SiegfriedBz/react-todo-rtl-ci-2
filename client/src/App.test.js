import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import App from './App'

describe('App', () => {

  const setup = () => {
    let submitBtnElement = screen.getByRole('button')
    let nameInputElement = screen.getByRole('textbox', { name: /name/i })
    let emailInputElement = screen.getByRole('textbox', {name: /email/i})
    let passwordInputElement = screen.getByLabelText("Password")
    let confirmPasswordInputElement = screen.getByLabelText("Confirm Password")
    let emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
    let weakPasswordErrorMessageElement = screen.queryByText(/Please enter a stronger password/i)
    let invalidConfirmPasswordErrorMessageElement = screen.queryByText(/Password confirmation does not match/i)

    return {
      submitBtnElement,
      nameInputElement,
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
      emailErrorMessageElement,
      weakPasswordErrorMessageElement,
      invalidConfirmPasswordErrorMessageElement
    }
  }

  const userTypesIntoForm = (args) => {
    const { submitBtnElement } = setup()

    args.forEach(({element, input}) => {
      userEvent.type(element, input)
    })

    fireEvent.click(submitBtnElement)
  }

  test('inputs should be empty on initial render', () => {
    render(<App />)
    const { nameInputElement, emailInputElement, passwordInputElement, confirmPasswordInputElement } = setup()

    expect(nameInputElement).toBeInTheDocument()
    expect(nameInputElement.value).toBe('')

    expect(emailInputElement).toBeInTheDocument()
    expect(emailInputElement.value).toBe('')

    expect(passwordInputElement).toBeInTheDocument()
    expect(passwordInputElement.value).toBe('')

    expect(confirmPasswordInputElement).toBeInTheDocument()
    expect(confirmPasswordInputElement.value).toBe('')
  })

  test('user should be able to input its name', () => {
    render(<App />)
    const { nameInputElement } = setup()

    const userInput = 'John Doe'
    userTypesIntoForm([{element: nameInputElement, input: userInput}])
    expect(nameInputElement.value).toBe(userInput)
  })

  test('user should be able to input its email', () => {
    render(<App />)
    const { emailInputElement } = setup()

    const emailInput = 'john.doe@example.com'

    userTypesIntoForm([{element: emailInputElement, input: emailInput}])
    expect(emailInputElement.value).toBe(emailInput)
  })

  test('user should be able to input its password', () => {
    render(<App />)
    const { passwordInputElement } = setup()

    const passwordInput = '123456'

    userTypesIntoForm([{element: passwordInputElement, input: passwordInput}])
    expect(passwordInputElement.value).toBe(passwordInput)
  })

  test('user should be able to input its confirmed password', () => {
    render(<App />)
    const { confirmPasswordInputElement } = setup()

    const confirmPasswordInput = '123456'

    userTypesIntoForm([{element: confirmPasswordInputElement, input: confirmPasswordInput}])
    expect(confirmPasswordInputElement.value).toBe(confirmPasswordInput)
  })

  describe('submit button & error messages', () => {

    it('should display correct error message when input email is not valid', () => {
      render(<App />)
      let { emailInputElement, emailErrorMessageElement } = setup()

      const invalidEmailInput = 'john.doe'

      expect(emailErrorMessageElement).not.toBeInTheDocument()

      userTypesIntoForm([{element: emailInputElement, input: invalidEmailInput}])

      emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
      expect(emailErrorMessageElement).toBeInTheDocument()
    })

    it('should display correct error message when input email is valid && password is not valid', () => {
      render(<App />)
      let { emailInputElement, passwordInputElement, emailErrorMessageElement, weakPasswordErrorMessageElement } = setup()

      const validEmailInput = 'john.doe@example.com'
      const weakPasswordInput = '123456'

      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()

      userTypesIntoForm([
          {element: emailInputElement, input: validEmailInput},
        {element: passwordInputElement, input: weakPasswordInput}
      ])

      emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
      weakPasswordErrorMessageElement = screen.queryByText(/Please enter a stronger password/i)
      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).toBeInTheDocument()
    })

    it('should display correct error message when input email and password are valid && confirmed password is not valid', () => {
      render(<App />)
      let { emailInputElement, passwordInputElement, confirmPasswordInputElement, emailErrorMessageElement, weakPasswordErrorMessageElement, invalidConfirmPasswordErrorMessageElement } = setup()

      const validEmailInput = 'john.doe@example.com'
      const validPasswordInput = 'Malta123456Yes$$$$$$$'
      const invalidConfirmPasswordInput = 'Malta123456Yes$$$'

      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()
      expect(invalidConfirmPasswordErrorMessageElement).not.toBeInTheDocument()

      userTypesIntoForm([
        {element: emailInputElement, input: validEmailInput},
        {element: passwordInputElement, input: validPasswordInput},
        {element: confirmPasswordInputElement, input: invalidConfirmPasswordInput},
      ])

      emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
      weakPasswordErrorMessageElement = screen.queryByText(/Please enter a stronger password/i)
      invalidConfirmPasswordErrorMessageElement = screen.queryByText(/Password confirmation does not match/i)
      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()
      expect(invalidConfirmPasswordErrorMessageElement).toBeInTheDocument()
    })

    it('should not display any error message when input email, password and confirmed password are valid', () => {
      render(<App />)
      let { emailInputElement, passwordInputElement, confirmPasswordInputElement, emailErrorMessageElement, weakPasswordErrorMessageElement, invalidConfirmPasswordErrorMessageElement } = setup()

      const validEmailInput = 'john.doe@example.com'
      const validPasswordInput = 'Malta123456Yes$$$$$$$'
      const validConfirmPasswordInput = validPasswordInput

      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()
      expect(invalidConfirmPasswordErrorMessageElement).not.toBeInTheDocument()

      userTypesIntoForm([
        {element: emailInputElement, input: validEmailInput},
        {element: passwordInputElement, input: validPasswordInput},
        {element: confirmPasswordInputElement, input: validConfirmPasswordInput},
      ])

      emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
      weakPasswordErrorMessageElement = screen.queryByText(/Please enter a stronger password/i)
      invalidConfirmPasswordErrorMessageElement = screen.queryByText(/Password confirmation does not match/i)
      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()
      expect(invalidConfirmPasswordErrorMessageElement).not.toBeInTheDocument()
    })
  })
})
