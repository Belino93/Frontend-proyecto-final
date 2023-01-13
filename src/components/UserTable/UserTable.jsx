import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteUserByAdmin } from "../../services/apiCalls";

function UserTable(users) {
  const [clickedUser, setClickedUser] = useState({});
  const [show, setShow] = useState(false);
  const [usersArray, setuserArray] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const arrayUsers = users;

  const clickHandler = (user) => {
    setClickedUser(user);
    handleShow();
  };
  
  const deleteButtonHandler = (user) => {
    const body = { user_id: user?.id };
    deleteUserByAdmin(body)
      .then((res) => {
        arrayUsers?.arrayUsers.filter((user) => user?.id !== clickedUser?.id)
        handleClose()
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
          </tr>
        </thead>
        <tbody>
          {arrayUsers?.arrayUsers.map((user, index) => {
            return (
              <tr key={index} onClick={() => clickHandler(user)}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
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

        <Modal.Footer className=" justify-content-center">
          <Button variant="danger" onClick={() => {deleteButtonHandler(clickedUser)}}>
            Delete
          </Button>
          <Button variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserTable;
