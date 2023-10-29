import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"; 

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the autho token and redirect
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('userEmail', credentials.email);
      props.showAlert ("Logged in Successfully","success");
      navigate("/"); // histroy.push("/")  is now upgraded in v6
      
    } else {
      props.showAlert("Invalid Credentialas","danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="container h-100 d-flex justify-content-center align-items-center"
    >
      <div className="card p-5 rounded border shadow" style={{ background: "black",color:"white" }}>
        <form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4 text-decoration-underline">Login</h1>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              aria-describedby="emailHelp"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your Email here"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter Password"
            />
          </div>
          <div className="d-flex justify-content-center "> 
            <button type="submit" className="btn btn-primary ">
              Login
            </button>
            <button type="reset" className="btn btn-danger" style={{marginLeft:"50px"}}>
              Cancel
            </button>
          </div>
          <p className="mt-3">
            Don't have an account?{" "}
            <Link to="/signup">Click here to sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;