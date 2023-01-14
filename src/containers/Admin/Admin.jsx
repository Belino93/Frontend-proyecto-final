import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getAllUsersRepairs,
  getUserRepairsByImei,
  nextRepairState,
  prevRepairState,
  getAllUsers,
  newDevice,
  newRepair,
} from "../../services/apiCalls";
import Spinner from "react-bootstrap/Spinner";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import { debounce } from "lodash";
import UserTable from "../../components/UserTable/UserTable";
import "./Admin.css";

function Admin() {
  const [usersRepairs, setUsersRepairs] = useState([]);
  const [clickedRepair, setClickedRepair] = useState({});
  const [search, setSearch] = useState([]);
  const [repairError, setRepairError] = useState("");
  const [modalError, setModalError] = useState("");
  const [inputsModal, setInputsModal] = useState({
    type: "",
    device: "",
    brand: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createModal, setCreateModal] = useState("");
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const [refresh, setRefresh] = useState(false);
  const [usersScreen, setUsersScreen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsersRepairs()
      .then((res) => {
        setUsersRepairs(res.data.data);
      })
      .catch((error) => {});
  }, [refresh]);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res.data.data);
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
    nextRepairState(deviceRepairId)
      .then((res) => {
        refreshScreen();
        handleClose();
      })
      .catch();
  };
  const prevState = (deviceRepairId) => {
    prevRepairState(deviceRepairId)
      .then((res) => {
        setRefresh(!refresh);
        handleClose();
      })
      .catch((error) => console.log(error));
  };

  const refreshScreen = () => {
    setRefresh(!refresh);
  };

  const usersClickHandler = (event) => {
    if (event.target.innerHTML === "Repairs" && usersScreen) {
      return setUsersScreen(!usersScreen);
    }
    if (event.target.innerHTML === "Users" && !usersScreen) {
      return setUsersScreen(!usersScreen);
    }
    if (event.target.innerHTML === "New Repair") {
      setCreateModal(event.target.innerHTML);
      return handleShowCreateModal(!showCreateModal);
    }
    if (event.target.innerHTML === "New Device") {
      setCreateModal(event.target.innerHTML);
      return handleShowCreateModal(!showCreateModal);
    }
  };

  const setInputs = (e) => {
    setInputsModal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendModal = () => {
    if (createModal === "New Repair") {
      const type = inputsModal.type;
      const body = {
        type: type,
      };
      newRepair(body)
        .then((res) => {
          handleCloseCreateModal();
        })
        .catch((error) => {});
    }
    if (createModal === "New Device") {
      const brand = inputsModal.brand;
      const model = inputsModal.model;
      const body = {
        brand: brand,
        model: model,
      };
      newDevice(body)
        .then((res) => {
          handleCloseCreateModal();
        })
        .catch((error) => {});
    }
  };

  return (
    <Container fluid className="min-vh-100 text-center container-home">
      <Row className="mb-2">
        <Tabs
          defaultActiveKey="repairs"
          variant="pills"
          onClick={(e) => usersClickHandler(e)}
        >
          <Tab
            key={"repair"}
            id="repairs"
            eventKey="repairs"
            title="Repairs"
            tabClassName="profile-menu"
          ></Tab>
          <Tab
            key={"users"}
            id="users"
            eventKey="users"
            title="Users"
            tabClassName="profile-menu"
          ></Tab>
          <Tab
            key={"newRepair"}
            id="users"
            title="New Repair"
            tabClassName="profile-menu"
          ></Tab>
          <Tab
            key={"newDevice"}
            id="users"
            title="New Device"
            tabClassName="profile-menu"
          ></Tab>
        </Tabs>
      </Row>
      {usersScreen && (
        <Row className="card">
          <UserTable users={users} refresh={refreshScreen}></UserTable>
        </Row>
      )}
      {!usersScreen && (
        <Row className="m-2">
          <SearchInput handler={inputHandler}/>
        </Row>
      )}
      {usersRepairs.length === 0 && search.length === 0 && !usersScreen && (
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
      {search.length > 0 && !usersScreen && (
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
      {search.length < 1 && !usersScreen && (
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
        <Modal.Footer className=" justify-content-between">
          <Button
            variant="danger"
            onClick={() => {
              prevState(clickedRepair?.id);
            }}
            className=" justify-content-start"
          >
            Prev state
          </Button>
          <Button
            variant="success"
            onClick={() => nextState(clickedRepair?.id)}
          >
            Next state
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>{createModal}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {createModal === "New Repair" && (
            <>
              <div className="d-flex justify-content-center align-items-center">
                <input
                  name="type"
                  placeholder="type"
                  onChange={(e) => setInputs(e)}
                ></input>
              </div>
            </>
          )}
          {createModal === "New Device" && (
            <>
              <div className="d-flex justify-content-center align-items-center">
                <input
                  name="brand"
                  placeholder="brand"
                  onChange={(e) => setInputs(e)}
                ></input>
                <input
                  name="model"
                  placeholder="model"
                  onChange={(e) => setInputs(e)}
                ></input>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className=" justify-content-center">
          <Button variant="success" onClick={() => sendModal()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Admin;
