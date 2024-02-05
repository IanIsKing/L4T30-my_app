// services for fetching data from the backend

// This function searches for all users with the given name from the backend
export async function searchUsers(userName) {
  try {
    const response = await fetch(`/api/searchusers/${userName}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// This function searches for a single users with the given name from the backend
export async function searchUserDetails(userName) {
  try {
    const response = await fetch(`/api/users/${userName}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// This function searches for the latest repos for a single user with the given name from the backend
export async function searchUserRepos(userName) {
  try {
    const response = await fetch(`/api/repos/${userName}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// This function searches for the latest commits for a single user with the given name and repo from the backend
export async function getCommitHistory(fullName) {
  try {
    const response = await fetch(`/api/commits/${fullName}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
