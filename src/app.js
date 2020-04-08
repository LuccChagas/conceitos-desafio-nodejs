const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const repos = repositories

  return response.json(repos)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body

  const repo = {id: uuid(), title, url, techs, likes}

  repositories.push(repo);
  
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
 
  const findById = repositories.findIndex(repo => repo.id === id);

  if (findById < 0) {
    return response.status(400).json({ "error": "This ID value is invalid"});
  }

  const { likes } = repositories[findById];

  const repoUpdated = {id, title, url, techs, likes };

  repositories[findById] = repoUpdated;

  return response.json(repoUpdated);

});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params

  const findById = repositories.findIndex(repo => repo.id === id);

  if (findById < 0) {
    return res.status(400).json({ "error": "This ID value is invalid"});
  }

  repositories.splice(repositories[findById], 1);

  return res.status(204).send();


});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const findById = repositories.findIndex(repo => repo.id === id);

  if (findById < 0) {
    return response.status(400).json({ "error": "This ID value is invalid"});
  }
  
  repositories.find(() => repositories[findById].likes++);
  

  const repo = {...repositories[findById]}


  return response.json(repo);
  
});

module.exports = app;
