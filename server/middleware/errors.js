const { pick } = require('lodash');
const { CustomError } = require('../errors/customErrors');

const handleError = (error, _req, res, _next) => {
  console.error(error);

  const isErrorSafeForClient = error instanceof CustomError;

  const clientError = isErrorSafeForClient
    ? pick(error, ['message', 'code', 'status', 'data'])
    : {
        message: 'Something went wrong, please contact our support.',
        code: 'INTERNAL_ERROR',
        status: 500,
        data: {},
      };

  res.status(clientError.status).send({ error: clientError });
};

module.exports = handleError();
