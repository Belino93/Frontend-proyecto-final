import { useState, useEffect } from "react";
import "./Profile.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  getUserRepairs,
  getUserRepairsByImei,
} from "../../../services/apiCalls";
import Spinner from "react-bootstrap/Spinner";
import SearchInput from "../../../components/SearchInput/SearchInput";
import { debounce } from "lodash";

function Profile() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const [userRepairs, setUserRepairs] = useState([]);
  const [clickedRepair, setClickedRepair] = useState({});
  const [search, setSearch] = useState([]);
  const [repairError, setRepairError] = useState("");

  useEffect(() => {
    getUserRepairs()
      .then((res) => {
        setUserRepairs(res.data.data);
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          setRepairError(error?.response?.data.message);
        }
      });
  }, []);

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

  return (
    <Container fluid className="min-vh-100 text-center container-home">
      <Row>
        <Col className="mt-1">
          <div className="search-div">
            <SearchInput handler={inputHandler} />
          </div>
        </Col>
      </Row>
      {userRepairs.length === 0 && search.length === 0 && (
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
          <Row className="">
            {userRepairs.map((repair, index) => {
              return (
                <>
                  <Col key={index} className="col-12 col-md-6 mb-2">
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
                    </div>
                  </Col>
                </>
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
            Status: <span className="highlighted">{clickedRepair?.status}</span>
          </p>
          <p>Last status update: {clickedRepair?.updated_at?.slice(0, 10)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Profile;
