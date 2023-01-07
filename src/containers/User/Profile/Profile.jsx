import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getUserRepairs } from "../../../services/apiCalls";
import Spinner from "react-bootstrap/Spinner";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userRepairs, setUserRepairs] = useState([]);

  useEffect(() => {
    getUserRepairs()
      .then((res) => {
        setUserRepairs(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container fluid className="d-flex min-vh-100 justify-content-center flex-column text-center">
      {userRepairs.length === 0 && (
        <Row className="container-home flex-grow-1">
          <Col>
            <div>
            <Spinner animation="border" variant='light' className="spinner-load" />
            </div>
          </Col>
        </Row>
      )}

      {userRepairs.length > 0 && (
        <Row className="container-home flex-grow-1">
            {userRepairs.map((repair, index) => {
              return (
                <Col key={index} className="card col-12 col-md-6">
                  <h1>
                    {repair.brand} {repair.model}
                  </h1>
                  <h3>Repair type: {repair.type}</h3>
                  <p>IMEI: {repair.imei}</p>
                  <p>Status: {repair.name}</p>
                </Col>
              );
            })}
        </Row>
      )}
    </Container>
  );
}

export default Profile;
