# Advanced React and Redux

## Testing React

### Jest

`Jest` is an antomated test runner which gets installed when you run `create-react-app`. It finds any file that looks like:

- Something.test.js or;
- Something.spec.js

Or every .js file under `__test__` folder

To excute, just the npm command

```bash
npm run test
```

### What to test?

- Look at each individual part of your app.
  - each react compoent, react reducer, each action
- Imagine telling a friend "here is what this piece of code does"
  - what does each part do?
- Write a test to verify each part does what you expect

### plain example

A plain example can look like this

```javascript
it("shows a comment block", () => {
  //tricking react with jsDOM (a library)
  //create a fake div as if it's working in a broswer
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);

  // you can console log the output and see it in the test suit
  console.log(div.innerHTML);

  // this is similar to assert in python
  expect(div.innerHTML).toContain("CommentBox");

  ReactDOM.unmountComponentAtNode(div);
});
```

### it

A global function refered as **it function** (or **it block**) to form the test.

```
it(description of the test, function cotaining test logic)
```

#### expect

Syntax looks like this

```
expect(value that we are inspecting)match statement(value that we expect)

// like this
expect(div.innterHTML)toContain("hello")
```

match statements things like:

- toContain("things to be contained")
- toBeTruthy()
- toEqual("thing to be equal to")

### enzyme

enzyme is a package built by airbnb to make react test easier.

```bash
npm install --save enzyme enzyme-adapter-react-16 # the last number is the version of you react major version. Look at your package.json to find out what version you are using

```

You have to then create a file `src/setupTest.js` and copy and paste this

```javascript
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
```

The Enzyme API has three formats:

- Static: render the given component and return plain HTML (no click event etc)
- Shallow: return just the given component and none of its children
- Full DOM: return the component and all of its children + let us modify it afterwards.

### Absolute import

To use absolute import in your react project.
Add `jsconfig.json` in the root directory and copy and paste this

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

### describe

Use `describe()` to group `it` functions

```javascript
describe("description of the des", () =>{
    // so you can do the set up that only affects the it blocks in the scope
    beforeEach(()=> {
        ...
    })
    it('checks this', () => ...)

    it("checks that", () => ...)

})
```

### Test with redux

When you hook up with redux to use redux store, since the store is connected thru the Provider, you have to wrap those components with Provier. A good way to solve this issue to to create a reusable `Root` component. Check the code for example.

#### Pass initial state for testing

When you use `createStore()`, you can pass the second param for initial state.

```javascript
export default ({ children, initialState = {} }) => {
  return (
    <Provider store={createStore(reducers, initialState)}>{children}</Provider>
  );
};
```

So in you test, you will be able to do this:

```javascript
beforeEach(() => {
  const initialState = {
    comments: ["comment1", "comment2"],
  };

  wrapped = mount(
      <Root initialState={initialState}>
         <MyComponent>
      </Root>
  )
});
```

### Test external api

Jest does not allow you the make the call to outside api (jsDOM prevents it).

#### moxios

Mock for axios - the sole purpse to mock the response for axios. Though this is a bit more involved. You will to put a timeout for moxios to get back the response and call `done()` for Jest to let it wait until you say it'sdone

```javascript
// find the fetchComments button and click it
wrapped.find(".fetch-comments").simulate("click");

// after button is clicked, we need to introduce a pause
// for moxios to get back response before we can inspect the result
moxios.wait(() => {
  wrapped.update();
  // Expect to find a lisf of comments
  expect(wrapped.find("li").length).toEqual(2);
  done();
});
```

## Higher Order Component

Follow these steps when creating a HOC:

- Write the logic you want to reuse into a component (i.e., if your CommentBox component needs to check auth, write that logic in the CommentBox component first)
- Create a HOC file and add the HOC scaffold
- Move the reusable logic into the HOC
- Pass props/config/behavior through to child component. We are responsible to make sure that whatever that's supposed to get passed to the child component are being passed thru the HOC we created

Boilerplate for HOC file:

```javascript
import React from "react";

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    retnder() {
      return <ChildComponent {...this.props} />;
    }
  }

  return ComponsedComponent;
};
```

## Middleware

Function that intercetps betweem Actiom and Reducers. The purpose is we get the oppotunity to look at the action, and we can things like:

- delay it if it's a promise/async until we get the response back
- log it (since you have access to the action and the state before it goes to reducer)
- modify it
- stop it from being sent to reducer

#### JSON schema

Use JSON schema to build a middleware to validate redux state

```bash
npm install --save tv4

```

Go to `jsonschema.net` to generate a json schema file by providing a json payload.

## Sever set up

Use express server to build auththentication api. We will also be using mongo db

```
# create a package.json
npm init
# install dependencies
npm install --save express mongoose morgan body-parser nodemon

```

To kick off the server,

```
node index.js
```

Use `nodemon` so the code change will be automatically detected and restart the server

```
npm install --save nodemon


```

then go to `package.json` and add a script

```
scripts: {
  "dev": nodemon index.js
}
```

Then you can start the server by running. You can just use this command to start your server :)

```
npm run dev
```

## Mongodb

The installation can very much change so just refer to the documentation.

Installation:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

As of this point in time, once you install mododb it creates

```
- the configuration file (/usr/local/etc/mongod.conf)
- the log directory path (/usr/local/var/log/mongodb)
- the data directory path (/usr/local/var/mongodb)


```

### Robomongo

UI for mongodb. Create a connection and start using it.

- You can write query using mongoapi which is pretty cool. For example:

```
db.getCollection('users').find({"email":"hhsu18@gmail.com"})
```

### Encrypt password

Use `bcrypt-nodejs`

- Install package

```
npm install --save bcrypt-nodejs
```

- refer to `authentication.js`

### Authenticate User

When signing up or signing in, we give a token in exchange for an id. This sounds the secret api KEY?

```
User id + our secret string = JSON Web Token(JWT)
```

In the future, when a user makes an authenticated request they should include their JWT.

```
JWT + our secret string = user id
```

- Installation

```
npm install --save jwt-simple
```

### Passport

Use passport(which is an ecosystem that provides many "strategies", here we are specifically using the "jwt strategy") to handle some prevalidation before the incoming request hit the route handler.

```
Incoming request --> passport --> route handler
```

where in our example, the passport does this:

```
passport strategy1 -> verify user with a JWT
passport strategy2 -> verify user with a username and password
```

Install passport

```
npm install --save passport passport-jwt
```

Install passport-local

```
npm install --save passport-local
```

Refer to `passport.js`. Baiscally this is what's happening:

```
sign up --> verify email is not in use --> token
sign in --> verify email/password --> token
auth'd request --> verify token --> resource access
```

### CORS

Cross Origin Resource Sharing. A security impleted inside of the Browser.

### Example

If some hacker creates a fishing website trying to trick the user to login to thier bank account and transfer money. You can imagine that the browser is going to find out: you are trying to call an API that has a different domain. The browser is going to make a request to the server asking "hey you have a request coming from a different domain.". (to be precise, it also checks the subdomain and port, ) The backend server has then the options to either allow the request or disallow the request.

This is why when we are trying to make a call to the api which is in say "localhost:3090" from localhost:3000 it will by default be rejected by CORS.

For API client like Postman or when you run crul on the terminal, the client is not a browser so we get to by pass this issue.

To solve this we will use `cors`

```
npm install --save cors
```

## Client Side Auth

Refer to `client/`

Couple of steps here:

- create multiple routes for Sign up, Sign in, Sign out and feature. This is done thru 'react-router-dom'.
- Use React Form to manage the form creation and submission and form state.
- When user tries to sign in, calling the server with form props which has email and password, the server checks the email and password and returns token once successed.
- State records if a user is a authorized, or if error it will have the error message.
- Once user is signed up, we direct the user to `/feature` page using the `this.props.history.push()` thru a callback. This is done in the action creator fucntion.
- If the user is not signed in, we will not allow the user to access the `/feature`. We will do this thru Higher Order Component. Refer to the code. `requreAuth.js`

### localstorage (to persist the loggin state)

Everytime when we refresh the webpage the state is gone. So if a user is authorized but then refreshes the page he will have to relogin again. To solve this issue, browser has so called `localstorage`. We can simple use

```javascript
localStorage.setItem("someKey", "someValue");
localStorage.getItem("someKey"); // will return "someValue"
```

Here are the steps:

- In the action creator, when user is authorized we set the token in the localstore
- In the `src/index.js`, when we create the redux store, we provide the localstore as the initial state. If the localstore has the token then the user is considered authorized. A user can refresh the page and still be logged in.
- When user is trying to signout, we will remove the localstorage and provide a new state (basically just empty token).
- In terms of the links we display, we will check if the user is sign in, then we show `sign out`, otherwise we will show `sign in` and `sign up`.
