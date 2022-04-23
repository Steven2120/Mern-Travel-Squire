class ErrorMessageHandlerClass extends Error {
  constructor(message, statusCode) {
    super(message, statusCode);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failure" : "error";
    this.isOperational = true;
  }
}

module.exports = ErrorMessageHandlerClass;
