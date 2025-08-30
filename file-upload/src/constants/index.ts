export const HTTP_STATUS = {
  OK: { code: 200, message: 'OK' },
  CREATED: { code: 201, message: 'Created' },
  BAD_REQUEST: { code: 400, message: 'Bad Request' },
  UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
  FORBIDDEN: {
    code: 403,
    message: 'You are not authorized to perform this action'
  },
  NOT_FOUND: { code: 404, message: 'Not Found' },
  CONFLICT: { code: 409, message: 'Conflict' },
  PAYMENT_REQUIRED: { code: 402, message: 'Payment Required' },
  UNPROCESSABLE_ENTITY: { code: 422, message: 'Unprocessable Entity' },
  INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal Server Error' },
  BAD_GATEWAY: { code: 502, message: 'Bad Gateway' }
};
