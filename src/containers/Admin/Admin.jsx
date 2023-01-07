import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { getAllUsersRepairs } from "../../services/apiCalls";
import Spinner from "react-bootstrap/Spinner";


function Admin() {
  const [usersRepairs, setUsersRepairs] = useState([]);

  useEffect(() => {
    getAllUsersRepairs()
      .then((res) => {
        console.log(res)
        setUsersRepairs(res.data.data)})
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container fluid className="d-flex min-vh-100 justify-content-center flex-column text-center">
      {usersRepairs.length === 0 && (
        <Row className="container-home flex-grow-1">
          <Col>
            <div>
            <Spinner animation="border" variant='light' className="spinner-load" />
            </div>
          </Col>
        </Row>
      )}
      {usersRepairs.length > 0 && (
        <Row className="container-home flex-grow-1">
          {usersRepairs.map((userRepair, index) =>{
            return(
                <Col key={index}>
                    <h1>
                    {userRepair.brand} {userRepair.model}
                  </h1>
                  <h3>Repair type: {userRepair.type}</h3>
                  <p>IMEI: {userRepair.imei}</p>
                  <p>Status: {userRepair.name}</p>
                  <p>Owner: {userRepair.email}</p>
                </Col>
            )
          })}
        </Row>
      )}
    </Container>
  );
}

export default Admin;
