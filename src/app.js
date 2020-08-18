const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.use("/repositories/:id", require("./validateUuid"));

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body,
    id = uuid(),
    likes = 0;

  const repository = { id, title, url, techs, likes };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const recordIndex = repositories.findIndex(repository => repository.id = id);

  if (recordIndex < 0) {
    return response(400).json({error: 'Record not found.'});
  }

  repositories[recordIndex] = { ...repositories[recordIndex], title, url, techs };

  return response.json(repositories[recordIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const recordIndex = repositories.findIndex(repository => repository.id === id);

  if (recordIndex < 0) {
    return response(400).json({error: 'Record not found.'});
  }

  repositories.splice(recordIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const recordIndex = repositories.findIndex(repository => repository.id = id);

  if (recordIndex < 0) {
    return response(400).json({error: 'Record not found.'});
  }

  repositories[recordIndex].likes++;

  return response.json(repositories[recordIndex]);
});

module.exports = app;
