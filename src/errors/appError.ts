class AppError {
  httpStatus: number;
  message: string;

  constructor(_message: string, _httpStatus: number) {
    this.httpStatus = _httpStatus;
    this.message = _message;
  }
}
export default AppError;
