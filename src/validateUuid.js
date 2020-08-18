const { isUuid } = require("uuidv4");

module.exports = (request, response, next) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid record ID.' });
  }

  return next();
};
