import React from "react";
import { mount } from "enzyme";
import Root from "Root";
import CommentBox from "components/CommentBox";

let wrapped;

// set up
beforeEach(() => {
  // take the full dom component
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

// tear down
afterEach(() => {
  wrapped.unmount();
});

it("has a text area and two buttons", () => {
  //console.log(wrapped.find("textarea").length);
  expect(wrapped.find("textarea").length).toEqual(1);
  expect(wrapped.find("button").length).toEqual(2);
});

describe("the text area", () => {
  beforeEach(() => {
    // simulate the type in the text area
    wrapped
      .find("textarea")
      .simulate("change", { target: { value: "new comment" } });

    // force the components to rerender. You can not realy on the setState because it's async
    wrapped.update();
  });

  it("has a text area that users can type in", () => {
    // find the text area and get the value of the "value" property
    expect(wrapped.find("textarea").prop("value")).toEqual("new comment");
  });

  it("clears out text after user hits submit", () => {
    // submit the form
    wrapped.find("form").simulate("submit");
    wrapped.update();

    // check if it's empty
    expect(wrapped.find("textarea").prop("value")).toEqual("");
  });
});
