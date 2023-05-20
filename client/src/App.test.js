import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import App from './App'

describe('App', () => {

  const getInputElements = () => {
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

  const userTypesIntoForm = ({ name, email, password, confirmPassword }) => {
    const { submitBtnElement, nameInputElement, emailInputElement, passwordInputElement, confirmPasswordInputElement } = getInputElements()

    if(name) {
        userEvent.type(nameInputElement, name)
    }
    if(email) {
        userEvent.type(emailInputElement, email)
    }
    if(password) {
        userEvent.type(passwordInputElement, password)
    }
    if(confirmPassword) {
        userEvent.type(confirmPasswordInputElement, confirmPassword)
    }

    fireEvent.click(submitBtnElement)

    return { nameInputElement, emailInputElement, passwordInputElement, confirmPasswordInputElement }
  }

  test('inputs should be empty on initial render', () => {
    render(<App />)
    const { nameInputElement, emailInputElement, passwordInputElement, confirmPasswordInputElement } = getInputElements()

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
    let { nameInputElement } = getInputElements()

    const nameInput = 'John Doe'
    userTypesIntoForm({
      name: nameInput
    })
    expect(nameInputElement.value).toBe(nameInput)
  })

  test('user should be able to input its email', () => {
    render(<App />)
    const { emailInputElement } = getInputElements()

    const emailInput = 'john.doe@example.com'

    userTypesIntoForm({
      email: emailInput
    })
    expect(emailInputElement.value).toBe(emailInput)
  })

  test('user should be able to input its password', () => {
    render(<App />)
    const { passwordInputElement } = getInputElements()

    const passwordInput = '123456'

    userTypesIntoForm({
      password: passwordInput
    })
    expect(passwordInputElement.value).toBe(passwordInput)
  })

  test('user should be able to input its confirmed password', () => {
    render(<App />)
    const { confirmPasswordInputElement } = getInputElements()

    const confirmPasswordInput = '123456'

    userTypesIntoForm({
      confirmPassword: confirmPasswordInput
    })
    expect(confirmPasswordInputElement.value).toBe(confirmPasswordInput)
  })

  describe('submit button & error handling', () => {

    it('should display correct error message when input email is not valid', () => {
      render(<App />)
      let { emailErrorMessageElement } = getInputElements()

      const invalidEmailInput = 'john.doe'

      expect(emailErrorMessageElement).not.toBeInTheDocument()

      userTypesIntoForm({
        email: invalidEmailInput
      })

      emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
      expect(emailErrorMessageElement).toBeInTheDocument()
    })

    it('should display correct error message when input email is valid && password is not valid', () => {
      render(<App />)
      let { emailErrorMessageElement, weakPasswordErrorMessageElement } = getInputElements()

      const validEmailInput = 'john.doe@example.com'
      const weakPasswordInput = '123456'

      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()

      userTypesIntoForm({
        email: validEmailInput,
        password: weakPasswordInput
      })

      emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
      weakPasswordErrorMessageElement = screen.queryByText(/Please enter a stronger password/i)
      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).toBeInTheDocument()
    })

    it('should display correct error message when input email and password are valid && confirmed password is not valid', () => {
      render(<App />)
      let { emailErrorMessageElement, weakPasswordErrorMessageElement, invalidConfirmPasswordErrorMessageElement } = getInputElements()

      const validEmailInput = 'john.doe@example.com'
      const validPasswordInput = 'Malta123456Yes$$$$$$$'
      const invalidConfirmPasswordInput = 'Malta123456Yes$$$'

      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()
      expect(invalidConfirmPasswordErrorMessageElement).not.toBeInTheDocument()

      userTypesIntoForm({
        email: validEmailInput,
        password: validPasswordInput,
        confirmPassword: invalidConfirmPasswordInput
      })

      emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
      weakPasswordErrorMessageElement = screen.queryByText(/Please enter a stronger password/i)
      invalidConfirmPasswordErrorMessageElement = screen.queryByText(/Password confirmation does not match/i)
      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()
      expect(invalidConfirmPasswordErrorMessageElement).toBeInTheDocument()
    })

    it('should not display any error message when input email, password and confirmed password are valid', () => {
      render(<App />)
      let { emailErrorMessageElement, weakPasswordErrorMessageElement, invalidConfirmPasswordErrorMessageElement } = getInputElements()

      const validEmailInput = 'john.doe@example.com'
      const validPasswordInput = 'Malta123456Yes$$$$$$$'
      const validConfirmPasswordInput = validPasswordInput

      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()
      expect(invalidConfirmPasswordErrorMessageElement).not.toBeInTheDocument()

      userTypesIntoForm({
          email: validEmailInput,
          password: validPasswordInput,
          confirmPassword: validConfirmPasswordInput
      })

      emailErrorMessageElement = screen.queryByText(/Please enter a valid email/i)
      weakPasswordErrorMessageElement = screen.queryByText(/Please enter a stronger password/i)
      invalidConfirmPasswordErrorMessageElement = screen.queryByText(/Password confirmation does not match/i)
      expect(emailErrorMessageElement).not.toBeInTheDocument()
      expect(weakPasswordErrorMessageElement).not.toBeInTheDocument()
      expect(invalidConfirmPasswordErrorMessageElement).not.toBeInTheDocument()
    })
  })
})
