// GitHut API backend, using Express and Octokit, to search for users, get user details, get user repos, and get user commits
import express from "express";
import helmet from "helmet";
import { Octokit } from "octokit";
const port = process.env.PORT || 3001;
const app = express();

// Use Helmet!
app.use(helmet());

// This function searches for all users with the given name
async function getSearchUsers(name) {
  console.log("getSearchUsers", name);
  const octokit = new Octokit();
  try {
    const response = await octokit.request(`GET /search/users`, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      q: name,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// This function searches for a single users with the given name
async function getUser(name) {
  console.log("getUser", name);
  const octokit = new Octokit();
  try {
    const response = await octokit.request(`GET /users/${name}`, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// This function searches for the latest 5 repos for a single user with the given name
async function getRepos(name) {
  console.log("getRepos", name);
  const octokit = new Octokit();
  try {
    const response = await octokit.request(`GET /users/${name}/repos`, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// This function searches for the latest 5 commits for a single user with the given name and repo
async function getCommits(name, repo) {
  console.log("getCommits", name, repo);
  const octokit = new Octokit();
  try {
    const response = await octokit.request(
      `GET /repos/${name}/${repo}/commits`,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// The end points

// This end point searches for all users with the given name
app.get("/api/searchusers/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const users = await getSearchUsers(name);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// This end point searches for a single users with the given name
app.get("/api/users/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const users = await getUser(name);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// This end point searches for the latest repos for a single user with the given name
app.get("/api/repos/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const users = await getRepos(name);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// This end point searches for the latest commits for a single user with the given name and repo
app.get("/api/commits/:name/:repo", async (req, res) => {
  const name = req.params.name;
  const repo = req.params.repo;
  try {
    const users = await getCommits(name, repo);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
