import "./Register.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Register() {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password1: "",
    password2: "",
  });

  const [userError, setUserError] = useState({
    nameError: "",
    surnameError: "",
    emailError: "",
    password1Error: "",
    password2Error: "",
  });

  const inpHandler = (e) => {
    setUser((prevState) =>({
        ...prevState,
        [e.target.name]: e.target.value,
    }));
  }

  return (
    <Container fluid className="main">
      <Row className="container-register">
        <Col className="d-flex flex-column justify-content-center">
          <div className="card">
            <h1>Register</h1>
            <form className="d-flex flex-column gap-2">
              <label className="inp" htmlFor="inp">
                <input type="text" autoComplete="none" name="name" onChange={(e) => inpHandler(e)}/>
                <span className="label">Name</span>
                <span className="focus-bg"></span>
              </label>
              <div className="inp-error"></div>
              <label className="inp" htmlFor="inp">
                <input type="text" name="surname" autoComplete="none"onChange={(e) => inpHandler(e)} />
                <span className="label">Surname</span>
                <span className="focus-bg"></span>
              </label>
              <div className="inp-error"></div>
              <label className="inp" htmlFor="inp">
                <input type="email" name="email" onChange={(e) => inpHandler(e)}/>
                <span className="label">Email</span>
                <span className="focus-bg"></span>
              </label>
              <div className="inp-error"></div>
              <label className="inp" htmlFor="inp">
                <input type="password" name="password1" onChange={(e) => inpHandler(e)}/>
                <span className="label">Password</span>
                <span className="focus-bg"></span>
              </label>
              <div className="inp-error"></div>
              <label className="inp" htmlFor="inp">
                <input type="password" name="password2" onChange={(e) => inpHandler(e)}/>
                <span className="label">Repeat Password</span>
                <span className="focus-bg"></span>
              </label>
              <div className="inp-error"></div>
              <button className="custom-btn btn-1" onClick={() => {}}>
                Register
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
