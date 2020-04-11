import React from "react";

import { shallow } from "enzyme";
import App from "components/App";
import CommentBox from "components/CommentBox";
import CommentList from "components/CommentList";

let wrapped;
// set up logic before each it blocks run
beforeEach(() => {
  wrapped = shallow(<App />);
});

it("shows a comment block", () => {
  expect(wrapped.find(CommentBox).length).toEqual(1);
});

it("shows a comment list", () => {
  expect(wrapped.find(CommentList).length).toEqual(1);
});
