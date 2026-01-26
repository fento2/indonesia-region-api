"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    /**
     * 200 OK
     * The request has been successfully processed by the server.
     * Commonly used for successful GET requests, updates, or general success responses.
     */
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    /**
     * 201 CREATED
     * A new resource has been successfully created on the server.
     * Commonly used after POST requests.
     */
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    /**
     * 202 ACCEPTED
     * The request has been accepted but has not been completed yet.
     * Usually used for async or background processing.
     */
    HttpStatus[HttpStatus["ACCEPTED"] = 202] = "ACCEPTED";
    /**
     * 204 NO CONTENT
     * The request was successful, but there is no content to return.
     * Commonly used for delete operations or updates without a response body.
     */
    HttpStatus[HttpStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    /**
     * 400 BAD REQUEST
     * The request is invalid (wrong body, query parameters, or missing required fields).
     */
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    /**
     * 401 UNAUTHORIZED
     * Authentication is required or the provided credentials are invalid.
     */
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    /**
     * 403 FORBIDDEN
     * The request is authenticated, but the user does not have permission to access this resource.
     */
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    /**
     * 404 NOT FOUND
     * The requested resource or endpoint could not be found.
     */
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    /**
     * 409 CONFLICT
     * The request could not be completed due to a conflict with the current state of the resource.
     */
    HttpStatus[HttpStatus["CONFLICT"] = 409] = "CONFLICT";
    /**
     * 422 UNPROCESSABLE ENTITY
     * The request is well-formed but failed validation.
     */
    HttpStatus[HttpStatus["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    /**
     * 500 INTERNAL SERVER ERROR
     * An unexpected error occurred on the server.
     */
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    /**
     * 501 NOT IMPLEMENTED
     * The requested functionality has not been implemented.
     */
    HttpStatus[HttpStatus["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    /**
     * 502 BAD GATEWAY
     * The server received an invalid response from an upstream server.
     */
    HttpStatus[HttpStatus["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    /**
     * 503 SERVICE UNAVAILABLE
     * The server is currently unavailable (maintenance or overload).
     */
    HttpStatus[HttpStatus["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
