import { render, screen } from "@testing-library/react";
import SearchUserComponent from "./Components/SearchUser";

test("renders Search GitHub", () => {
  render(<SearchUserComponent onUserResults={[]} />);
  const linkElement = screen.getByText(/Search GitHub/);
  expect(linkElement).toBeInTheDocument();
});
