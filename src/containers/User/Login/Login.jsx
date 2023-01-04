import { useState, useEffect } from "react";
import "./Login.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { loginUser } from "../../../services/apiCalls";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const inpHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(user)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      })
      .then(() => {
        setLoginError("");
      })
      .catch((error) => setLoginError(error.response.data.message));
  };

  return (
    <Container fluid className="main min-vh-100">
      <Row className="container-register">
        <Col className="d-flex flex-column justify-content-center">
          <div className="card">
            <h1 className="register-text">Login</h1>
            <form className="d-flex flex-column form" onSubmit={handleSubmit}>
              <label className="inp" htmlFor="inp">
                <input
                  type="text"
                  name="email"
                  onChange={(e) => inpHandler(e)}
                />
                <span className="label">Email</span>
                <span className="focus-bg"></span>
              </label>
              <label className="inp" htmlFor="inp">
                <input
                  type="password"
                  name="password"
                  onChange={(e) => inpHandler(e)}
                />
                <span className="label">Password</span>
                <span className="focus-bg"></span>
              </label>
              <div>
                <button className="custom-btn btn-1" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
