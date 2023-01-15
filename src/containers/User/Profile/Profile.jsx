import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  getUserRepairs,
  getUserRepairsByImei,
  getProfile,
} from "../../../services/apiCalls";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Spinner from "react-bootstrap/Spinner";
import SearchInput from "../../../components/SearchInput/SearchInput";
import { debounce } from "lodash";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import "./Profile.css";

function Profile() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userRepairs, setUserRepairs] = useState([]);
  const [clickedRepair, setClickedRepair] = useState({});
  const [search, setSearch] = useState([]);
  const [repairError, setRepairError] = useState("");
  const [profile, setProfile] = useState(false);
  const [userPofile, setUserProfile] = useState({});

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

  useEffect(() => {
    getProfile()
      .then((res) => setUserProfile(res))
      .catch((error) => {
        return;
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
      .catch((error) => {
        return;
      });
  }, 500);

  const clickHandler = (repair) => {
    setClickedRepair(repair);
    handleShow();
  };
  const profileClickHandler = (event) => {
    if (event.target.innerHTML === "Repairs" && profile) {
      return setProfile(!profile);
    }
    if (event.target.innerHTML === "Profile" && !profile) {
      return setProfile(!profile);
    }
  };

  return (
    <>
      <Container fluid className="min-vh-100 text-center container-home">
        <Row>
          <Tabs
            defaultActiveKey="repairs"
            variant="pills"
            onClick={(e) => profileClickHandler(e)}
            className="tabs-container"
          >
            <Tab
              key={"repair"}
              id="repairs"
              eventKey="repairs"
              title="Repairs"
              tabClassName="profile-menu"
            ></Tab>
            <Tab
              key={"profile"}
              id="repairs"
              eventKey="profile"
              title="Profile"
              tabClassName="profile-menu"
            ></Tab>
          </Tabs>
        </Row>
        {profile && (
          <>
            <ProfileCard
              className="card profile-card mt-2"
              userData={userPofile}
            ></ProfileCard>
          </>
        )}
        {!profile && (
          <div>
          <Row className="m-2">
            <SearchInput handler={inputHandler} />
          </Row>
          </div>
        )}

        {userRepairs.length === 0 && search.length === 0 && !profile && (
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
        {search.length > 0 && !profile && (
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
                      <p>
                        Imei: <span className="highlighted">{repair.imei}</span>
                      </p>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </>
        )}

        {search.length < 1 && !profile && (
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
                          Imei:{" "}
                          <span className="highlighted">{repair.imei}</span>
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
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title className="d-flex flex-column justify-content-center align-items-center">
            <p>Repair No.{clickedRepair?.id}</p>
            <p>
              {clickedRepair?.brand} {clickedRepair?.model}
            </p>
          </Modal.Title>
          <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
            <p>Repair type: {clickedRepair?.type}</p>
            <p>IMEI: {clickedRepair?.imei}</p>
            <p>Created: {clickedRepair?.created_at?.slice(0, 10)}</p>
            <p>
              Status:{" "}
              <span className="highlighted">{clickedRepair?.status}</span>
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
    </>
  );
}

export default Profile;
