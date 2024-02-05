// Home page component that will be rendered when the user visits the home page. It will contain the search user component and the users component.
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../App.css";
import SearchUserComponent from "../Components/SearchUser";
import Users from "../Components/Users";
import { useState } from "react";

function Home() {
  // State to store the users
  const [users, setUsers] = useState([]);
  const [, setSelectedUser] = useState(null);

  // Function to handle the user response, this is called when the user search component returns the users
  const handleUserResponse = (data) => {
    setUsers(data);
  };

  // Function to handle the selected user, this is called when the user selects a user from the list of users,
  // if the user is selected, the user will be stored in the state and the user page will be rendered
  const HandleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <SearchUserComponent onUserResults={handleUserResponse} />
          </Col>
        </Row>
        {users.total_count && (
          <>
            <Row>
              <Col className="text-center">
                <h3>Users</h3>
              </Col>
            </Row>
            <Row>
              {users.items.map((user) => (
                <Users
                  key={user.id}
                  user={user}
                  onSelectUser={HandleSelectUser}
                />
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default Home;
