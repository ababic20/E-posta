import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [name, setname] = useState('');
  const [last_name, setlast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const backendUrl = "http://localhost:3001";

  const handleLogin = async () => {
    const response = await fetch(`${backendUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, last_name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        navigate("/login");
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <div className="container">
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      <h1 className="heading">Registration</h1>
      <input
        type="text"
        placeholder="First name"
        value={name}
        onChange={(e) => setname(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Last name"
        value={last_name}
        onChange={(e) => setlast_name(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <button onClick={handleLogin} className="button">
        Register
      </button>
    </div>
  );
};

export default RegistrationForm;
