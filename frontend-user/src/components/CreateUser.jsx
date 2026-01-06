import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/CreateUser.css";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await fetch("/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Account Creation Failed");
      }

      //Clear form after successful submission
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-user-container">
      <h2 className="signup-title">Sign up here!</h2>

      {error && <p className="error">{error}</p>}

      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit">
          {loading ? "Creating Account..." : "Create Account!"}
        </button>
        <p className="already-user">
          Already have an account? <NavLink to="/login">Log in</NavLink>
        </p>
        <a href="http://localhost:3000/auth/google" className="google-btn">
          <img
            src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
            alt="Sign in with Google"
          />
        </a>
      </form>
    </div>
  );
}

export default CreateUser;
