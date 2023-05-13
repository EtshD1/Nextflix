import { validate } from "isemail";

export const INIT_EMAIL_STATE: EmailInput = {
  email: "",
  warnUser: false,
  isValid: false,
};

const emailReducer = (
  state: EmailInput,
  action: EmailReducerAction
): EmailInput => {
  switch (action.type) {
    case "input":
      const value = action.payload;
      return { email: value, isValid: validate(value), warnUser: false };
    case "clear_warning":
      return { email: state.email, isValid: state.isValid, warnUser: false };
    case "check_validity":
      const valid = validate(state.email);
      return { email: state.email, isValid: valid, warnUser: !valid };
    case "warn_user":
      return {
        email: state.email,
        isValid: state.isValid,
        warnUser: state.warnUser,
      };
  }
};

export default emailReducer;
