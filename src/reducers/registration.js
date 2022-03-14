import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../actionConstants/actionConstants"

export function registration(state = {}, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { registering: true };
    case REGISTER_SUCCESS:
      return { registering: false };
    case REGISTER_FAILURE:
      return { registering: false };
    default:
      return state
  }
}