import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { searchUsers } from "../services";
import { useState } from "react";
import "../App.css";
import { FaGithubSquare } from "react-icons/fa";

export default function SearchUserComponent({ onUserResults }) {
  // State to store the user name, the user results and the searching state
  const [searchingUser, setSearchingUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [userResults, setUserResults] = useState([]);

  // Function to search for the user when the search button is clicked
  async function search(event) {
    event.preventDefault();
    console.log("searching: " + userName);
    if (userName === "") {
      alert("Fill in all fields");
      return;
    }
    setSearchingUser(true);
    try {
      const data = await searchUsers(userName);
      setUserResults(data);
      onUserResults(data);
      console.log(data);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setSearchingUser(false);
    }
  }

  return (
    <div>
      {searchingUser ? (
        <h1 className="noUsers">Searching...</h1>
      ) : (
        <div>
          {userResults.total_count ? (
            <div className="users">
              <h4>
                <FaGithubSquare /> Search GitHub
              </h4>
              <Form onSubmit={search}>
                <Form.Group controlId="formBasic">
                  <Form.Label>Search User</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter user name"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Form>
            </div>
          ) : (
            <div className="noUsers">
              <h1 className="header">
                <FaGithubSquare /> Search GitHub
              </h1>
              <Form onSubmit={search}>
                <Form.Group controlId="formBasic">
                  <Form.Control
                    type="text"
                    placeholder="Enter user name"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Search
                </Button>
                {userResults.total_count === 0 && (
                  <p>Sorry no user with that name please try again</p>
                )}
              </Form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
