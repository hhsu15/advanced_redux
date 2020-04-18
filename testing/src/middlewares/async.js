export default ({ dispatch }) => (next) => (action) => {
  // check to see if the action has a promise on it's payload property
  // if it does not, send the action to the next middleware
  //debugger;
  if (!action.payload || !action.payload.then) {
    return next(action); // the return statement here is just to bail out, not really returning anything
  } else {
    // if it's a promise, we want to wait for the promise to resolve and then
    // create a new action with the data and dispatch it!!
    action.payload.then((response) => {
      const newAction = { ...action, payload: response };
      dispatch(newAction);
    });
  }
};
