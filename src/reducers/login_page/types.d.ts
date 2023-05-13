type EmailActionDispatcher = (action: EmailReducerAction) => void;

interface EmailInput {
  email: string;
  isValid: boolean;
  warnUser: boolean;
}

type EmailReducerAction =
  | { type: "warn_user" }
  | { type: "input"; payload: string }
  | { type: "clear_warning" }
  | { type: "check_validity" };
