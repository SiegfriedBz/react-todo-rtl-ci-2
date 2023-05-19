import { useState } from 'react'
import validator from 'validator'
import './App.css';

function App() {

  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
      setUserInput({
        ...userInput,
        [name]: value
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!validator.isEmail(userInput.email)) {
      return setError({ message: 'Please enter a valid email' })
    }
    if(!validator.isStrongPassword(userInput.password)) {
      return setError({ message: 'Please enter a stronger password' })
    }
    if(userInput.password !== userInput.confirmPassword) {
      return setError({ message: 'Password confirmation does not match' })
    }
    else {
      setError({ message: '' })
    }
  }

  return (
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                defaultValue={userInput.name}
                onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
                type="text"
                name="email"
                id="email"
                defaultValue={userInput.email}
                onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                defaultValue={userInput.password}
                onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password-confirmation" className="form-label">Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                id="password-confirmation"
                defaultValue={userInput.confirmPassword}
                onChange={handleChange}
            />
          </div>
          <button
              type='submit'
              className='btn btn-primary'
          >
            Submit
          </button>
          {error?.message && <p className='alert alert-warning'>{error.message}</p>}
        </form>
      </div>
  );
}

export default App;
