import React from "react";
import renderer from "react-test-renderer";
import SearchUserComponent from "./SearchUser";

// Snapshot test for SearchUserComponent
test("SearchUserComponent snapshot", () => {
  const component = renderer.create(<SearchUserComponent onUserResults={[]} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
