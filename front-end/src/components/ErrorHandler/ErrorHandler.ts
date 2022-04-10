const ErrorHandler = (errorMessage: any) => {
  if (errorMessage === null || errorMessage === undefined) {
    return "no-error";
  } else {
    return "alert alert-danger displayError alert-dismissible fade show";
  }
};

export default ErrorHandler;
