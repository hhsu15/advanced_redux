import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import Root from "Root";
import App from "components/App";

beforeEach(() => {
  // turn on moxios
  moxios.install();
  // intercept axios with mocked response
  moxios.stubRequest("http://jsonplaceholder.typicode.com/comments", {
    status: 200,
    response: [{ name: "fetch 1" }, { name: "fetch 2" }],
  });
});

afterEach(() => {
  moxios.uninstall();
});
it("can fetch a list of comments and display them", () => {
  // attempt to render ther entire app
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );

  // find the fetchComments button and click it
  wrapped.find(".fetch-comments").simulate("click");

  // after button is clicked, we need to introduce a pause
  // for moxios to get back response before we can inspect the result
  moxios.wait(() => {
    wrapped.update();
    // Expect to find a lisf of comments
    expect(wrapped.find("li").length).toEqual(2);
    done();
    wrapped.unmount();
  });
});
