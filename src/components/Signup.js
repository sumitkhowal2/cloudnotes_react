import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (credentials.password !== credentials.cpassword) {
      alert("Password do not match.");
      return;
    }
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the autho token and redirect
      localStorage.setItem("token", json.authtoken);
      //localStorage.setItem('userEmail', credentials.email);
      props.showAlert("Account Successfully Created", "success");
      navigate("/login"); // histroy.push("/")  is now upgraded in v6
    } else {
      props.showAlert("This Email Already Exists in the Database.", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <div
        className="card p-5 rounded border shadow"
        style={{ background: "black", color: "white" }}
      >
        <form onSubmit={handleSubmit}>
          <h1 className="text-center mb-2 text-decoration-underline">Signup</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              aria-describedby="emailHelp"
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter Your Email"
              id="email"
              aria-describedby="emailHelp"
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password here"
              name="password"
              className="form-control"
              id="password"
              minLength={5}
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Enter here Confirm-Password"
              name="cpassword"
              className="form-control"
              id="cpassword"
              minLength={5}
              required
              onChange={onChange}
            />
          </div>

          <div className="d-flex justify-content-center ">
            <button type="submit" className="btn btn-primary ">
              Signup
            </button>
            <button
              type="reset"
              className="btn btn-danger"
              style={{ marginLeft: "50px" }}
            >
              Cancel
            </button>
          </div>
          <p>
            If already have an account?{" "}
            <Link to="/login">Click here to login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
