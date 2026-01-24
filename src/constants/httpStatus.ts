export enum HttpStatus {
  /**
   * 200 OK
   * The request has been successfully processed by the server.
   * Commonly used for successful GET requests, updates, or general success responses.
   */
  OK = 200,

  /**
   * 201 CREATED
   * A new resource has been successfully created on the server.
   * Commonly used after POST requests.
   */
  CREATED = 201,

  /**
   * 202 ACCEPTED
   * The request has been accepted but has not been completed yet.
   * Usually used for async or background processing.
   */
  ACCEPTED = 202,

  /**
   * 204 NO CONTENT
   * The request was successful, but there is no content to return.
   * Commonly used for delete operations or updates without a response body.
   */
  NO_CONTENT = 204,

  /**
   * 400 BAD REQUEST
   * The request is invalid (wrong body, query parameters, or missing required fields).
   */
  BAD_REQUEST = 400,

  /**
   * 401 UNAUTHORIZED
   * Authentication is required or the provided credentials are invalid.
   */
  UNAUTHORIZED = 401,

  /**
   * 403 FORBIDDEN
   * The request is authenticated, but the user does not have permission to access this resource.
   */
  FORBIDDEN = 403,

  /**
   * 404 NOT FOUND
   * The requested resource or endpoint could not be found.
   */
  NOT_FOUND = 404,

  /**
   * 409 CONFLICT
   * The request could not be completed due to a conflict with the current state of the resource.
   */
  CONFLICT = 409,

  /**
   * 422 UNPROCESSABLE ENTITY
   * The request is well-formed but failed validation.
   */
  UNPROCESSABLE_ENTITY = 422,

  /**
   * 500 INTERNAL SERVER ERROR
   * An unexpected error occurred on the server.
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * 501 NOT IMPLEMENTED
   * The requested functionality has not been implemented.
   */
  NOT_IMPLEMENTED = 501,

  /**
   * 502 BAD GATEWAY
   * The server received an invalid response from an upstream server.
   */
  BAD_GATEWAY = 502,

  /**
   * 503 SERVICE UNAVAILABLE
   * The server is currently unavailable (maintenance or overload).
   */
  SERVICE_UNAVAILABLE = 503,
}
