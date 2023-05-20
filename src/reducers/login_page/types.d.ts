type EmailActionDispatcher = (action: EmailReducerAction) => void;

interface EmailInput {
	email: string;
	isValid: boolean;
	warnUser: boolean;
	warning: string;
	loading: boolean;
}

type EmailReducerAction =
	| { type: "warn_user"; payload: string }
	| { type: "input"; payload: string }
	| { type: "clear_warning" }
	| { type: "clear_loading" }
	| { type: "loading" }
	| { type: "check_validity" };
