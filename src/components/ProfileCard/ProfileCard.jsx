import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../services/apiCalls";
import "./ProfileCard.css"
import Row from "react-bootstrap/Row";

function ProfileCard({ userData }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
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
    if (userInput?.surname === "" && userInput?.name === "") {
      return setError('Fill one field ')
    }
    if (userInput?.name === "") {
      userData.name = user?.name;
    }
    if (userInput?.surname === "") {
      userData.surname = user?.surname;
    }
    updateUser(userData)
      .then((res) => {return})
      .catch((error) => {return});
    setError("");
    setEditUser(false);
  };

  return (
    <>
      <Row className="profile-card mt-2 pt-5 pb-5">
        <div className="profile-data">
        <h1> Hello {user?.name} {user?.surname}</h1>
        <h4>Your email acount: {user?.email}</h4>

        {editUser && (
          <>
          <div >
            <input
              name="name"
              placeholder="new name"
              onChange={(e) => inputHandler(e)}
              className="input-update"
            ></input>
            </div>
            <div>
            <input
              name="surname"
              placeholder="new surname"
              onChange={(e) => inputHandler(e)}
              className="input-update"
            ></input>
            </div>
            <div>
            <Button
              variant="danger"
              className="m-2"
              onClick={() => {
                setEditUser(false);
                setError("")

              }}
            >
              Cancel
            </Button>
            </div>
            <div className="text-danger">{error}</div>
          </>
        )}
        <div>
        <Button
          className="mb-2 button-profile"
          onClick={() => {
            !editUser ? setEditUser(true) : sendUpdatedUser();
          }}
        >
          Edit profile
        </Button>
        </div>
        </div>
      </Row>
    </>
  );
}

export default ProfileCard;
