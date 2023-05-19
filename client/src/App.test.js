import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import App from './App'

describe('App', () => {

  test('inputs should be empty on initial render', () => {
    render(<App />);
    const nameInputElement = screen.getByRole('textbox', { name: /name/i });
    const emailInputElement = screen.getByRole('textbox', { name: /email/i });
    expect(nameInputElement).toBeInTheDocument();
    expect(nameInputElement.value).toBe('');
    expect(emailInputElement).toBeInTheDocument();
    expect(emailInputElement.value).toBe('');

    const passwordInputElement = screen.getByLabelText("Password");
    expect(passwordInputElement).toBeInTheDocument();
    expect(passwordInputElement.value).toBe('');

    const confirmedPasswordInputElement = screen.getByLabelText("Confirm Password");
    expect(confirmedPasswordInputElement).toBeInTheDocument();
    expect(confirmedPasswordInputElement.value).toBe('');
  });

  test('user should be able to input its name', () => {
    render(<App />)
    const nameInputElement = screen.getByRole('textbox', { name: /name/i });
    const userInput = 'John Doe';
    userEvent.type(nameInputElement, userInput);
    expect(nameInputElement.value).toBe(userInput);
  })

  test('user should be able to input its email', () => {
    render(<App />)
    const emailInputElement = screen.getByRole('textbox', { name: /email/i });
    const emailInput = 'john.doe@example.com'
    userEvent.type(emailInputElement, emailInput);
    expect(emailInputElement.value).toBe(emailInput);
  })

  test('user should be able to input its password', () => {
    render(<App />)
    const passwordInputElement = screen.getByLabelText("Password");
    const passwordInput = '123456';
    userEvent.type(passwordInputElement, passwordInput);
    expect(passwordInputElement.value).toBe(passwordInput);
  })

  test('user should be able to input its confirmed password', () => {
    render(<App />)
    const confirmedPasswordInputElement = screen.getByLabelText("Confirm Password");
    const passwordInput = '123456';
    userEvent.type(confirmedPasswordInputElement, passwordInput);
    expect(confirmedPasswordInputElement.value).toBe(passwordInput);
  })
})
