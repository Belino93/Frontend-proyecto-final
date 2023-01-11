import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import {
  getAllUsersRepairs,
  getUserRepairsByImei,
  nextRepairState,
  prevRepairState,
} from "../../services/apiCalls";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import { debounce } from "lodash";

function Admin() {
  const [usersRepairs, setUsersRepairs] = useState([]);
  const [clickedRepair, setClickedRepair] = useState({});
  const [search, setSearch] = useState([]);
  const [repairError, setRepairError] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAllUsersRepairs()
      .then((res) => {
        setUsersRepairs(res.data.data);
      })
      .catch((error) => {});
  }, [refresh]);

  const inputHandler = debounce((input) => {
    if (!input) {
      return setSearch([]);
    }
    getUserRepairsByImei(input)
      .then((res) => {
        setSearch(res.data.data);
      })
      .catch((error) => console.log(error));
  }, 500);

  const clickHandler = (repair) => {
    setClickedRepair(repair);
    handleShow();
  };

  const nextState = (deviceRepairId) => {
    console.log(deviceRepairId);
    nextRepairState(deviceRepairId)
      .then((res) => {
        setRefresh(!refresh)
        handleClose();
      })
      .catch();
  };
  const prevState = (deviceRepairId) => {
    console.log(deviceRepairId);
    prevRepairState(deviceRepairId)
      .then((res) => {
        setRefresh(!refresh)
        handleClose();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container fluid className="min-vh-100 text-center container-home">
      <Row>
        <Col className="mt-1">
          <div className="search-div">
            <SearchInput handler={inputHandler} />
          </div>
        </Col>
      </Row>
      {usersRepairs.length === 0 && search.length === 0 && (
        <Row className="flex-grow-1">
          <Col>
            {repairError === "" && (
              <div>
                <Spinner
                  animation="border"
                  variant="light"
                  className="spinner-load"
                />
              </div>
            )}
            {repairError !== "" && (
              <div>
                <h1>{repairError}</h1>
              </div>
            )}
          </Col>
        </Row>
      )}
      {search.length > 0 && (
        <>
          <Row className="">
            {search.map((repair, index) => {
              return (
                <Col key={index} className="col-12 col-md-6">
                  <div
                    className="card"
                    onClick={() => {
                      clickHandler(repair);
                    }}
                  >
                    <p>Repair No.{repair.id}</p>
                    <p>
                      {repair.brand} {repair.model}
                    </p>
                    <p>
                      Repair type:{" "}
                      <span className="highlighted">{repair.type}</span>
                    </p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </>
      )}

      {search.length < 1 && (
        <>
          <Row className="d-flex justify-content-center">
            {usersRepairs.map((repair, index) => {
              return (
                <Col key={index} className="col-12 col-md-5 mb-2">
                  <div
                    className="card"
                    onClick={() => {
                      clickHandler(repair);
                    }}
                  >
                    <p>Repair No.{repair.id}</p>
                    <p>
                      {repair.brand} {repair.model}
                    </p>
                    <p>
                      Repair type:{" "}
                      <span className="highlighted">{repair.type}</span>
                    </p>
                    <p>
                      Imei: <span className="highlighted">{repair.imei}</span>
                    </p>
                    <p>
                      Status: <span className="highlighted">{repair.name}</span>
                    </p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p>Repair No.{clickedRepair?.id}</p>
            <p>
              {clickedRepair?.brand} {clickedRepair?.model}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Repair type: {clickedRepair?.type}</p>
          <p>IMEI: {clickedRepair?.imei}</p>
          <p>Created: {clickedRepair?.created_at?.slice(0, 10)}</p>
          <p>
            Status: <span className="highlighted">{clickedRepair?.name}</span>
          </p>
          <p>Last status update: {clickedRepair?.updated_at?.slice(0, 10)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              prevState(clickedRepair?.id);
            }}
          >
            Prev state
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={() => nextState(clickedRepair?.id)}
          >
            Next state
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Admin;
