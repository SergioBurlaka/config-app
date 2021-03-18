import { SET_CONFIG_COLLECTION } from "../actions";
import { employeesColection } from "./initCollection";

const initialState = {
  configCollection: employeesColection,
};

const configReduser = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CONFIG_COLLECTION:
      return { ...state, configCollection: payload };
    default:
      return state;
  }
};

export default configReduser;
