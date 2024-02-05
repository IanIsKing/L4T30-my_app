// User Page to display user details and repositories
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { searchUserDetails, searchUserRepos } from "../services";
import Repo from "../Components/Repo";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";

export default function UserDetails() {
  // Get the user from the location state
  const location = useLocation();
  const { user } = location.state;

  // State to store the user details and the user repositories
  const [userDetails, setUserDetails] = useState({});
  const [repos, setRepos] = useState([]);

  // Function to fetch the user details
  async function fetchUserDetails() {
    try {
      const response = await searchUserDetails(user.login);
      setUserDetails(response);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  }

  // Function to fetch the user repositories
  async function fetchUserRepos() {
    try {
      const response = await searchUserRepos(user.login);
      setRepos(response);
    } catch (error) {
      console.error("Error fetching user repos", error);
    }
  }

  // Fetch the user details and the user repositories when the component is mounted
  useState(() => {
    fetchUserDetails();
    fetchUserRepos();
  }, []);

  return (
    <Container>
      <Row>
        <Col sm={2}>
          <Card className="text-center card">
            <Card.Body>
              <Card.Title>{user.login}</Card.Title>
              <Card.Text>
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="user-image"
                />
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <p>{userDetails.location}</p>
              <p>{userDetails.email}</p>
              <p>{userDetails.blog}</p>
              <p>{userDetails.company}</p>
              <Button variant="primary " href={userDetails.html_url}>
                Go to GitHub
              </Button>
              <Button variant="secondary=" href="/">
                Back to search
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={10}>
          <h1 className="header">{userDetails.name}</h1>
          <p>{userDetails.bio}</p>

          <h3>Repositories</h3>
          <CardGroup>
            {repos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}
