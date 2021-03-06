import { IUserInfoContext } from "../../Model/models";
import styles from "./ErrorHandler.module.css";
const ErrorHandler = (
  errorMessage: string | IUserInfoContext | null | undefined
) => {
  if (errorMessage === null || errorMessage === undefined) {
    return `${styles.no_error}`;
  } else {
    return `${styles.warningMessage} alert alert-danger displayError alert-dismissible`;
  }
};

export default ErrorHandler;
