const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

const getData = (url) =>
  new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err));
  });

app.get("/", async (req, res) => {
  const startTime = Date.now();
  const usersRequest = getData("https://jsonplaceholder.typicode.com/users");
  const postsRequest = getData("https://jsonplaceholder.typicode.com/posts");
  const [users, posts] = await Promise.all([usersRequest, postsRequest]);
  const endTime = Date.now();

  res.status(200).json({ time: endTime - startTime, users, posts });
});

app.listen(PORT, () =>
  console.log(`=======Connection established on port ${PORT}`)
);
