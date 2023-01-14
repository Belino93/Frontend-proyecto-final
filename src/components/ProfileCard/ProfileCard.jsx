import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../services/apiCalls";

import Row from "react-bootstrap/esm/Row";

function ProfileCard({ userData }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [userInput, setUserInput] = useState({
    name: "",
    surname: "",
  });

  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    setUser(userData);
  }, []);

  const inputHandler = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendUpdatedUser = () => {
    let userData = {
      name: userInput?.name,
      surname: userInput?.surname,
    };

    if (userInput?.name === "") {
      userData.name = user?.name;
    }
    if (userInput?.surname === "") {
      userData.surname = user?.surname;
    }

    updateUser(userData)
      .then((res) => {return})
      .catch((error) => {return});
    setEditUser(false);
    navigate("/");
  };

  return (
    <>
      <div className="card">
        <h1>{user?.name}</h1>
        <h1>{user?.surname}</h1>
        <h3>{user?.email}</h3>

        {editUser && (
          <>
            <input
              name="name"
              placeholder="new name"
              onChange={(e) => inputHandler(e)}
            ></input>
            <input
              name="surname"
              placeholder="new surname"
              onChange={(e) => inputHandler(e)}
            ></input>
            <Button
              variant="danger"
              className="m-2"
              onClick={() => {
                setEditUser(false);
              }}
            >
              Cancel
            </Button>
          </>
        )}

        <Button
          className="mb-2"
          onClick={() => {
            !editUser ? setEditUser(true) : sendUpdatedUser();
          }}
        >
          Edit profile
        </Button>
      </div>
    </>
  );
}

export default ProfileCard;
