import { useState, useEffect } from "react";
import "./Login.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { loginUser } from "../../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isSend, setIsSend] = useState(false);

  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    return;
  }, []);

  const inpHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email !== "" && user.password !== "") {
      setIsSend(true);
      loginUser(user)
        .then((res) => {
          let userData = {
            id: res.user.id,
            name: res.user.name,
            email: res.user.email,
          };
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(userData));
        })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          setLoginError(error.response.data.message);
          setIsSend(false);
        });
    }
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
              <div className="inp-error">{loginError}</div>
              <div></div>
              <div>
                {!isSend && (
                  <button className="custom-btn btn-1" type="submit">
                    Login
                  </button>
                )}
                {isSend && (
                  <Spinner animation="border" className="spinner-load" />
                )}
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
