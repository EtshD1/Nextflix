const EmailDispatcher = (dispatcher: EmailActionDispatcher) => {
	return {
		ChangeEmail: (payload: string) =>
			dispatcher({ type: "input", payload }),
		CheckValidity: () => dispatcher({ type: "check_validity" }),
		ClearLoading: () => dispatcher({ type: "clear_loading" }),
		ClearWarning: () => dispatcher({ type: "clear_warning" }),
		SetLoading: () => dispatcher({ type: "loading" }),
		WarnUser: (payload: string) => {
			dispatcher({ type: "warn_user", payload });
		},
	};
};

export default EmailDispatcher;
