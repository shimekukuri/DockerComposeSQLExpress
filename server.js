const express = require("express");
let cors = require("cors");

const db = require("./db");

const PORT = process.env.PORT || 4999;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options("/contactme/", cors());

app.get(`/`, cors(), (req, response) => {
  return response.json({
    information: `This server is used to handle requests made from my own personal site, if you have reached this server there is nothing here`,
    req: req,
  });
});

//Change to your endpoint, for this example it is for the /contactme/ table
//app.get("/contactme/", cors(), db.getDB)

app.post("/contactme/", cors(), db.newContact);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
