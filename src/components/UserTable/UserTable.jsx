import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteUserByAdmin, upgradeUserToAdmin } from "../../services/apiCalls";

function UserTable({ users, refresh }) {
  const [clickedUser, setClickedUser] = useState({});
  const [show, setShow] = useState(false);
  const [usersArray, setuserArray] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <>
      <Table striped bordered hover variant="dark" responsive>
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
          {users.map((user, index) => {
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
  );
}

export default UserTable;
