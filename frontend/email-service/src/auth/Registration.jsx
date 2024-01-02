import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const backendUrl = "http://localhost:3000";

  const handleLogin = async () => {
    const response = await fetch(`${backendUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
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
        value={email}
        onChange={(e) => setFirstName(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Last name"
        value={email}
        onChange={(e) => setLastName(e.target.value)}
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
        Login
      </button>
    </div>
  );
};
export default Registration;
