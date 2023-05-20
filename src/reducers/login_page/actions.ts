const EmailDispatcher = (dispatcher: EmailActionDispatcher) => {
  return {
    WarnUser: () => {
      dispatcher({ type: "warn_user" });
    },
    ClearWarning: () => dispatcher({ type: "clear_warning" }),
    CheckValidity: () => dispatcher({ type: "check_validity" }),
    ChangeEmail: (payload: string) => dispatcher({ type: "input", payload }),
  };
};

export default EmailDispatcher;
