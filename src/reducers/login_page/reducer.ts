import { validate } from "isemail";

export const INIT_EMAIL_STATE: EmailInput = {
	email: "",
	warnUser: false,
	isValid: false,
	warning: "",
	loading: false,
};

const emailReducer = (
	state: EmailInput,
	action: EmailReducerAction
): EmailInput => {
	switch (action.type) {
		case "input":
			const value = action.payload;
			return {
				email: value,
				isValid: validate(value),
				warnUser: false,
				warning: "",
				loading: state.loading,
			};
		case "clear_warning":
			return {
				email: state.email,
				isValid: state.isValid,
				warnUser: false,
				warning: "",
				loading: state.loading,
			};
		case "check_validity":
			const valid = validate(state.email);
			return {
				email: state.email,
				isValid: valid,
				warnUser: !valid,
				warning: valid ? "" : "Invalid Email",
				loading: state.loading,
			};
		case "warn_user":
			return {
				email: state.email,
				isValid: state.isValid,
				warnUser: true,
				warning: action.payload,
				loading: state.loading,
			};
		case "loading":
			return {
				email: state.email,
				isValid: state.isValid,
				warnUser: state.warnUser,
				warning: state.warning,
				loading: true,
			};
		case "clear_loading":
			return {
				email: state.email,
				isValid: state.isValid,
				warnUser: state.warnUser,
				warning: state.warning,
				loading: false,
			};
	}
};

export default emailReducer;
