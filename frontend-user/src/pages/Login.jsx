import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try{
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password}),
        })

        if(!response.ok){
            const errData = await response.json();
            throw new Error(errData.error || "Login Failed")
        }

            // What gets returned on successful login:

            // res.json({
            //     message: "Login successful",
            //     token,
            //     user: {
            //       id: user.id,
            //       username: user.username,
            //       role: user.role,
            //     },
            //   });
              

        const data = await response.json()


        //Need to setup local storage for token and use data
    }


  };

  return (
    <div className="login-container">
      <h2>Login here</h2>
      <form action="/login" method="post">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
