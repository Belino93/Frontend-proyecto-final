import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getUserRepairs,
  getUserRepairsByImei,
} from "../../../services/apiCalls";
import Spinner from "react-bootstrap/Spinner";
import SearchInput from "../../../components/SearchInput/SearchInput";
import { debounce } from "lodash";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userRepairs, setUserRepairs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUserRepairs()
      .then((res) => {
        setUserRepairs(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const inputHandler = (search) => {
    setSearch(search);
    getUserRepairsByImei(search)
      .then((res) => {
        setUserRepairs(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  //const inputHandler = debounce((input) => {
  //   setSearch(input);
  //   getUserRepairsByImei(search)
  //     .then((res) => {
  //       setUserRepairs(res.data.data);
  //     })
  //     .catch((error) => console.log(error))
  // }, 500);

  return (
    <Container
      fluid
      className="d-flex min-vh-100 flex-column text-center container-home gap-2 align-items-center"
    >
      <Row className="">
        <Col className="mt-1">
          <SearchInput handler={inputHandler} />
        </Col>
      </Row>
      {userRepairs.length === 0 && (
        <Row className="flex-grow-1 container-home">
          <Col>
            <div>
              <Spinner
                animation="border"
                variant="light"
                className="spinner-load"
              />
            </div>
          </Col>
        </Row>
      )}

      {userRepairs.length > 0 && (
        <>
          <Row className="">
            {userRepairs.map((repair, index) => {
              return (
                <Col key={index} className="col-12 col-md-6">
                  <div className="card ">
                  <p>Repair No.{repair.id}</p>
                  <p>
                    {repair.brand} {repair.model}
                  </p>
                  <p>
                    Repair type:{" "}
                    <span className="highlighted">{repair.type}</span>
                  </p>
                  <p>IMEI: {repair.imei}</p>
                  <p>Created: {repair.created_at.slice(0, 10)}</p>
                  <p>
                    Status: <span className="highlighted">{repair.name}</span>
                  </p>
                  <p>Last status update: {repair.updated_at?.slice(0, 10)}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </Container>
  );
}

export default Profile;
