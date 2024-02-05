// Repo card component
import Card from "react-bootstrap/Card";
import "../App.css";
import { BsCalendarDate } from "react-icons/bs";
import { MdUpdate } from "react-icons/md";
import { getCommitHistory } from "../services";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function Repo({ repo }) {
  // State to store the commits and the modal state
  const [commits, setCommits] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Function to format the date to a more readable format
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-UK", options).format(date);
  }

  // Function to get the commits for the repository
  function getCommits() {
    getCommitHistory(repo.full_name).then((data) => {
      setCommits(data);
      setShowModal(true);
    });
  }

  return (
    <div>
      <Card className="repo" style={{ width: "18rem" }} onClick={getCommits}>
        <Card.Body>
          <Card.Title>{repo.name}</Card.Title>
          <Card.Text>
            <p>{repo.description}</p>
            <p>Language: {repo.language}</p>
            <p>
              <BsCalendarDate />" {formatDate(repo.created_at)}
            </p>
            <p>
              <MdUpdate /> {formatDate(repo.updated_at)}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Commit History for {repo.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render commits or a message if there are no commits */}
          <ul>
            {commits.length > 0 ? (
              commits.map((commit) => (
                <div key={commit.sha}>
                  {" "}
                  <li>
                    {formatDate(commit.commit.author.date)} -{" "}
                    <i>{commit.commit.author.name}</i>
                    <br />
                    {commit.commit.message}
                  </li>
                </div>
              ))
            ) : (
              <p>No commits found.</p>
            )}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
