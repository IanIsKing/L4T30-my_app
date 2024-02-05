// User card component
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export default function User({ user }) {
  // Hook to navigate to the user page
  let navigate = useNavigate();
  console.log(user);

  // Function to navigate to the user page when the user card is clicked
  const navigateToUser = () => {
    navigate(`/user/${user.login}`, { state: { user } });
  };

  return (
    <Col sm={2}>
      <Card className="text-center card" onClick={navigateToUser}>
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
          <a href={user.html_url}>HitHub</a>
        </Card.Footer>
      </Card>
    </Col>
  );
}
