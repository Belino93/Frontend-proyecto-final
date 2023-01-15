import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteUserByAdmin, upgradeUserToAdmin } from "../../services/apiCalls";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import "./UserTable.css"

function UserTable({ users, refresh }) {
  const [clickedUser, setClickedUser] = useState({});
  const [show, setShow] = useState(false);
  const [usersArray, setusersArray] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [usersInPage, setUsersInPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastUser = currentPage * usersInPage;
  const indexOfFirstUser = indexOfLastUser - usersInPage;
  let arrayPage = [];

  useEffect(() => {
    arrayPage = users.slice(indexOfFirstUser, indexOfLastUser);
    setusersArray(arrayPage);
  }, [currentPage, users]);

  const clickHandler = (user) => {
    setClickedUser(user);
    handleShow();
  };

  const deleteButtonHandler = (user) => {
    const body = { user_id: user?.id };
    deleteUserByAdmin(body)
      .then((res) => {
        users.filter((user) => user?.id !== clickedUser?.id);
        refresh();
        handleClose();
      })
      .catch((error) => {return});
  };
  const upgradeButtonHandler = (user) => {
    const body = { user_id: user?.id };
    upgradeUserToAdmin(body)
      .then((res) => {
        users.filter((user) => user?.id !== clickedUser?.id);
        refresh();
        handleClose();
      })
      .catch((error) => {return});
  };

  const changePage = (e) => {
    setCurrentPage(e);
    arrayPage = users.slice(indexOfFirstUser, indexOfLastUser);
    setusersArray(arrayPage);
  };


  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        active={number === currentPage}
        key={number}
        onClick={() => {
          changePage(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
    {users.length === 0 && (
      <div>
        <Spinner animation="border" variant="dark" className="spinner-load" />
      </div>
    )}
    {usersArray.length === 0 && (
      <div>
        <h1>Any user here</h1>
      </div>
    )}
      {usersArray.length > 0 && (
        <>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Role ID</th>
              </tr>
            </thead>
            <tbody>
              {usersArray.map((user, index) => {
                return (
                  <tr key={index} onClick={() => clickHandler(user)}>
                    <td>{user?.id}</td>
                    <td>{user?.name}</td>
                    <td>{user?.surname}</td>
                    <td>{user?.email}</td>
                    <td>{user?.role_id}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          
        </>
      )}
      <div className="d-flex align-items-center justify-content-center">
            <Pagination>{items}</Pagination>
            <br />
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
              <Modal.Title className="d-flex justify-content-center align-items-center">
                <div>
                <p>User: {clickedUser?.id}</p>
                <p>
                  Name: {clickedUser?.name} {clickedUser?.surname}
                </p>
                <p>Email: {clickedUser?.email}</p>
                </div>
              </Modal.Title>
            {clickedUser?.role_id === 1 && (
              <Modal.Footer className=" justify-content-center">
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteButtonHandler(clickedUser);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    upgradeButtonHandler(clickedUser);
                  }}
                >
                  Upgrade
                </Button>
              </Modal.Footer>
            )}
          </Modal>
    </>
  );
}

export default UserTable;
