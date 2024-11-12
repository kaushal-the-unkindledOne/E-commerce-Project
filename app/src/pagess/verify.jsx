import { Container, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Verify.css";
import { UserData } from "../context/UserContext";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { verifyUser } = UserData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyUser(Number(otp), navigate);
  };

  return (
    <div className="verify-background">
      <Container className="verify-container">
        <h2 className="verify-title">Verify Account</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Button type="submit" className="verify-button">
            Verify
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Link to="/login" className="login-link">
            Go to Login Page
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Verify;
