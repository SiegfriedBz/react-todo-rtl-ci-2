import { useState } from 'react'
import './App.css';

function App() {

  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
      <div className="container my-5">
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                defaultValue={userInput.name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                defaultValue={userInput.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                defaultValue={userInput.password}
            />
          </div>
        </form>
      </div>
  );
}

export default App;
