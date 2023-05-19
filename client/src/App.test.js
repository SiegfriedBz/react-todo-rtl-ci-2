import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import App from './App'

describe('App', () => {

  let submitBtnElement,
      nameInputElement,
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
      emailErrorMessageElement,
      weakPasswordErrorMessageElement,
      invalidConfirmPasswordErrorMessageElement

  const setup = () => {
    submitBtnElement = screen.getByRole('button')
    nameInputElement = screen.getByRole('textbox', { name: /name/i })
    emailInputElement = screen.getByRole('textbox', {name: /email/i})
    passwordInputElement = screen.getByLabelText("Password")
    confirmPasswordInputElement = screen.getByLabelText("Confirm Password")
    emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
    weakPasswordErrorMessageElement = screen.queryByText(/Please enter a stronger password/i)
    invalidConfirmPasswordErrorMessageElement = screen.queryByText(/Password confirmation does not match/i)
  }

  test('inputs should be empty on initial render', () => {
    render(<App />)
    setup()

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
    setup()

    const userInput = 'John Doe'
    userEvent.type(nameInputElement, userInput)
    expect(nameInputElement.value).toBe(userInput)
  })

  test('user should be able to input its email', () => {
    render(<App />)
    setup()

    const emailInput = 'john.doe@example.com'
    userEvent.type(emailInputElement, emailInput)
    expect(emailInputElement.value).toBe(emailInput)
  })

  test('user should be able to input its password', () => {
    render(<App />)
    setup()

    const passwordInput = '123456'
    userEvent.type(passwordInputElement, passwordInput)
    expect(passwordInputElement.value).toBe(passwordInput)
  })

  test('user should be able to input its confirmed password', () => {
    render(<App />)
    setup()

    const confirmPasswordInput = '123456'
    userEvent.type(confirmPasswordInputElement, confirmPasswordInput)
    expect(confirmPasswordInputElement.value).toBe(confirmPasswordInput)
  })

  describe('submit button & error messages', () => {

    it('should display correct error message when input email is not valid', () => {
      render(<App />)
      setup()

      const invalidEmailInput = 'john.doe'

      expect(emailErrorMessageElement).not.toBeInTheDocument()

      userEvent.type(emailInputElement, invalidEmailInput)
      fireEvent.click(submitBtnElement)

      emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
      expect(emailErrorMessageElement).toBeInTheDocument()
    })

    it('should display correct error message when input email is valid && password is not valid', () => {
      render(<App />)
      setup()

      const validEmailInput = 'john.doe@example.com'
      const weakPasswordInput = '123456'

      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()

      userEvent.type(emailInputElement, validEmailInput)
      userEvent.type(passwordInputElement, weakPasswordInput)
      fireEvent.click(submitBtnElement)

      emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
      weakPasswordErrorMessageElement = screen.queryByText(/Please enter a stronger password/i)
      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).toBeInTheDocument()
    })

    it('should display correct error message when input email and password are valid && confirmed password is not valid', () => {
      render(<App />)
      setup()

      const validEmailInput = 'john.doe@example.com'
      const validPasswordInput = 'Malta123456Yes$$$$$$$'
      const invalidConfirmPasswordInput = 'Malta123456Yes$$$'

      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()
      expect(invalidConfirmPasswordErrorMessageElement).not.toBeInTheDocument()

      userEvent.type(emailInputElement, validEmailInput)
      userEvent.type(passwordInputElement, validPasswordInput)
      userEvent.type(confirmPasswordInputElement, invalidConfirmPasswordInput)
      fireEvent.click(submitBtnElement)

      emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
      weakPasswordErrorMessageElement = screen.queryByText(/Please enter a stronger password/i)
      invalidConfirmPasswordErrorMessageElement = screen.queryByText(/Password confirmation does not match/i)
      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()
      expect(invalidConfirmPasswordErrorMessageElement).toBeInTheDocument()
    })

    it('should not display any error message when input email, password and confirmed password are valid', () => {
      render(<App />)
      setup()

      const validEmailInput = 'john.doe@example.com'
      const validPasswordInput = 'Malta123456Yes$$$$$$$'
      const validConfirmPasswordInput = validPasswordInput

      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()
      expect(invalidConfirmPasswordErrorMessageElement).not.toBeInTheDocument()

      userEvent.type(emailInputElement, validEmailInput)
      userEvent.type(passwordInputElement, validPasswordInput)
      userEvent.type(confirmPasswordInputElement, validConfirmPasswordInput)
      fireEvent.click(submitBtnElement)

      emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
      weakPasswordErrorMessageElement = screen.queryByText(/Please enter a stronger password/i)
      invalidConfirmPasswordErrorMessageElement = screen.queryByText(/Password confirmation does not match/i)
      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()
      expect(invalidConfirmPasswordErrorMessageElement).not.toBeInTheDocument()
    })
  })
})
