const express = require("express");

const app = express();

const crudRouter = require("./api/crud");

const PORT = 3000;

app.use(express.json());
app.use("/user", crudRouter);

const server = app.listen(PORT, () =>
  console.log("Server listening on port", PORT)
);