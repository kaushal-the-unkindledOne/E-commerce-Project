import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserData } from "../context/UserContext";
import "../styles/Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const { userLogin } = UserData();
  const nagivate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await userLogin(email, password, nagivate);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="text-center">Login</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Username"
              className="form-control-custom"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 password-group" controlId="formBasicPassword">
            <div className="password-input-wrapper">
              <Form.Control
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                className="form-control-custom"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </Form.Group>

          <Button type="submit" className="btn-custom w-100">
            Login
          </Button>
          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
