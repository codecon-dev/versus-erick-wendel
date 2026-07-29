const express = require("express");
const app = express();
const port = 3000;

var batch = {
  total: 90,
  sold: 10,
  available: 90,
};

app.get("/batch", (req, res) => {
  res.send(batch);
});

app.post("/batch/reset", (req, res) => {
  const batch = {
    total: 100,
    sold: 0,
    available: 100,
  };
  res.send(batch);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
