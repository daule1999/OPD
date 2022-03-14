import { CLEAR, ERROR, SUCCESS } from "../actionConstants/actionConstants"
export function alert(
  state = {
    type: "no_alert",
  },
  action
) {
  switch (action.type) {
    case SUCCESS:
      return {
        type: "success",
        message: action.message,
      };
    case ERROR:
      return {
        type: "error",
        message: action.message,
      };
    case CLEAR:
      return {
        type: "info"
      };
    default:
      return state;
  }
}