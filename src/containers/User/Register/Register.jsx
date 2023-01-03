import "./Register.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { registerValidator } from "./registerCheck";

function Register() {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password2: "",
  });

  const [userError, setUserError] = useState({
    nameError: "",
    surnameError: "",
    emailError: "",
    passwordError: "",
    password2Error: "",
  });

  const inpHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true
    //console.log(user);
    Object.values(user).forEach(element => {
        if(element === ""){
            isValid = false;
        }
    });
    Object.values(userError).forEach(element => {
        if(element !== ""){
            isValid = false;
        }
    });
    if(!isValid){
        return console.log('No valid')
    }
    console.log('Register succesfully');
    
  };

  const errorHandler = (e) => {
    let error = "";
    error = registerValidator(e.target.name, e.target.value, user.password);
    if (error === undefined) {
      error = "";
    }
    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  return (
    <Container fluid className="main min-vh-100">
      <Row className="container-register">
        <Col className="d-flex flex-column justify-content-center">
          <div className="card">
            <h1 className="register-text">Register</h1>
            <form className="d-flex flex-column form" onSubmit={handleSubmit}>
              <label className="inp" htmlFor="inp">
                <input
                  type="text"
                  autoComplete="none"
                  name="name"
                  onChange={(e) => inpHandler(e)}
                  onBlur={(e) => errorHandler(e)}
                />
                <span className="label">Name</span>
                <span className="focus-bg"></span>
              </label>
              <div className="inp-error">{userError.nameError}</div>
              <label className="inp" htmlFor="inp">
                <input
                  type="text"
                  name="surname"
                  autoComplete="none"
                  onChange={(e) => inpHandler(e)}
                  onBlur={(e) => errorHandler(e)}
                />
                <span className="label">Surname</span>
                <span className="focus-bg"></span>
              </label>
              <div className="inp-error">{userError.surnameError}</div>
              <label className="inp" htmlFor="inp">
                <input
                  type="text"
                  name="email"
                  onChange={(e) => inpHandler(e)}
                  onBlur={(e) => errorHandler(e)}
                />
                <span className="label">Email</span>
                <span className="focus-bg"></span>
              </label>
              <div className="inp-error">{userError.emailError}</div>
              <label className="inp" htmlFor="inp">
                <input
                  type="password"
                  name="password"
                  onChange={(e) => inpHandler(e)}
                  onBlur={(e) => errorHandler(e)}
                />
                <span className="label">Password</span>
                <span className="focus-bg"></span>
              </label>
              <div className="inp-error">{userError.passwordError}</div>
              <label className="inp" htmlFor="inp">
                <input
                  type="password"
                  name="password2"
                  onChange={(e) => inpHandler(e)}
                  onBlur={(e) => errorHandler(e)}
                />
                <span className="label">Repeat Password</span>
                <span className="focus-bg"></span>
              </label>
              <div className="inp-error">{userError.password2Error}</div>
              <div>
                <button className="custom-btn btn-1" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
