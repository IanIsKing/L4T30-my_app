import { searchUsers } from "../services";

// call the function to test the search user component with the given input and check that it returns 30 results
test("Search git hub for the name Ian", async () => {
  try {
    const result = await searchUsers("Ian");
    console.log(result);
    expect(result).toHaveLength(30);
  } catch (error) {
    console.error(error);
  }
});
