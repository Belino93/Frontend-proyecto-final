import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteUserByAdmin, upgradeUserToAdmin } from "../../services/apiCalls";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";


function UserTable({ users, refresh }) {
  const [clickedUser, setClickedUser] = useState({});
  const [show, setShow] = useState(false);
  const [usersArray, setusersArray] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [usersInPage, setUsersInPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastUser = currentPage * usersInPage;
  const indexOfFirstUser = indexOfLastUser - usersInPage;
  let arrayPage = []

  useEffect(() => {
    arrayPage = users.slice(indexOfFirstUser, indexOfLastUser)
    setusersArray(arrayPage)
    refresh()
  }, [currentPage])
  
  useEffect(() => {
    arrayPage = users.slice(indexOfFirstUser, indexOfLastUser)
    setusersArray(arrayPage)
    refresh()
  }, [currentPage])

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
      .catch((error) => console.log(error));
  };
  const upgradeButtonHandler = (user) => {
    const body = { user_id: user?.id };
    upgradeUserToAdmin(body)
      .then((res) => {
        users.filter((user) => user?.id !== clickedUser?.id);
        refresh();
        handleClose();
      })
      .catch((error) => console.log(error));
  };

  const changePage = (e) => {
    setCurrentPage(e)
    arrayPage = users.slice(indexOfFirstUser, indexOfLastUser)
    setusersArray(arrayPage)
  }

  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} onClick={() => {changePage(number)}}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
    {users.length === 0 && (
      <div>
                <Spinner
                  animation="border"
                  variant="light"
                  className="spinner-load"
                />
              </div>
    )}
    {users.length > 0 && (
      <>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
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
      <div className="d-flex align-items-center justify-content-center">
        <Pagination>{items}</Pagination>
        <br />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p>User: {clickedUser?.id}</p>
            <p>
              {clickedUser?.name} {clickedUser?.surname}
            </p>
            <p>{clickedUser?.email}</p>
          </Modal.Title>
        </Modal.Header>
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
    )}
    </>
    
  );
}

export default UserTable;
