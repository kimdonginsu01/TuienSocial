import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Todo: Axios.create
      await axios.post("http://localhost:8800/api/auth/register", inputs);
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Tuen Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            animi porro aliquam quam culpa quisquam fuga, iste officiis esse
            asperiores.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
            {err}
            <button onClick={handleSubmit}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
