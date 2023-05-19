import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {

  test('inputs should be empty on initial render', () => {
    render(<App />);
    const nameInputElement = screen.getByRole('textbox', { name: /name/i });
    const emailInputElement = screen.getByLabelText(/email/i);
    const passwordInputElement = screen.getByLabelText(/password/i);
    expect(nameInputElement).toBeInTheDocument();
    expect(nameInputElement.value).toBe('');
    expect(emailInputElement).toBeInTheDocument();
    expect(emailInputElement.value).toBe('');
    expect(passwordInputElement).toBeInTheDocument();
    expect(passwordInputElement.value).toBe('');
  });

})


