const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repo);

  response.status(200).json(repo);
});

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex((item) => item.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const repo = {
    title,
    url,
    techs,
    id: id,
    likes: repositories[repoIndex].likes,
  };

  repositories[repoIndex] = repo;

  return response.status(200).json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((item) => item.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((item) => item.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }
  repositories[repoIndex].likes += 1;

  return response.status(200).json(repositories[repoIndex]);
});

module.exports = app;
