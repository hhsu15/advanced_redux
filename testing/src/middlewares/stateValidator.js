import tv4 from "tv4";
import stateSchema from "middlewares/stateSchema";
export default ({ dispatch, getState }) => (next) => (action) => {
  // first send the action to next
  next(action); // notice, once we call next and pass the action, it will go thru the middlewares and update the state
  // now the code keeps goind after the stqte has been updated...
  // once it's all done, the get our new , ipdated redux state
  if (tv4.validate(getState(), stateSchema)) {
    console.warn("Invalid state detected!!");
  }
  // validate structure and type of values in state
};
