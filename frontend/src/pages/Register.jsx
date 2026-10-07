import { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const registerData = {
      username: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
    };

    try {
      await axios.post(
        "http://https://shopease-ecommerce-wl99.onrender.com/api/register/",
        registerData
      );

      setMessage("Registration successful!");
    } catch (error) {
      console.error(error);
      setMessage("Registration failed.");
    }
  };

  return (
    <div className="register-page">
      <h1>Create Account</h1>

      <form
        className="register-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          required
        />

        <input
          type="email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">
          Register
        </button>

        {message && (
          <p className="register-message">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Register;