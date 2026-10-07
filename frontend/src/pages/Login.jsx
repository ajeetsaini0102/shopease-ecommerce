import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      username: event.target[0].value,
      password: event.target[1].value,
    };

    try {
      const response = await axios.post(
        "http://https://shopease-ecommerce-wl99.onrender.com/api/login/",
        loginData
      );

      localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      localStorage.setItem(
        "username",
        loginData.username
      );

      // Navbar ko batayenge ki login ho gaya
      window.dispatchEvent(new Event("storage"));

      setMessage("Login successful!");
    } catch (error) {
      console.error(error);
      setMessage("Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          required
        />

        <input
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">
          Login
        </button>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;