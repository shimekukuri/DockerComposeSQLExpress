const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "postgres",
  password: "meowththatsright",
  PORT: 5432,
});

const newContact = (request, response) => {
  const { name, email, phone, company } = request.body;

  if ((!name, !email, !phone, !company)) {
    response.status(204).send({ info: `need to input data into all fields` });
    return;
  }

  pool.query(
    "INSERT INTO recruiter (name, email, phone, company) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, phone, company],
    (error, result) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(201).send({ post: `New Contact Has Been added` });
    }
  );
};

const getDB = (request, response) => {
  pool.query("SELECT * FROM recruiter", [], (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

const initializeServer = (request, response) => {
  //change this to create a different database schema for your server
  pool.query(
    "CREATE TABLE recruiter ( ID SERIAL PRIMARY KEY, name VARCHAR(30), email VARCHAR(30), phone VARCHAR(30), company VARCHAR(30))",
    [],
    (error, result) => {
      if (error) {
        console.log(error);
        throw error;
      }
      console.log(result);
    }
  );
};

const seedServer = (request, response) => {
  //change this to change the values that you wish to seed the server with
  pool.query(
    "INSERT INTO recruiter (name, email, phone, company) VALUES ($1, $2, $3, $4) RETURNING *",
    ["TESTNAME", "TESTEMAIL", "TESTPHONE", "TESTCOMPANY"],
    (error, result) => {
      if (error) {
        console.log(error);
        throw error;
      }
      console.log(result);
    }
  );
};

module.exports = {
  newContact,
  initializeServer,
  seedServer,
  getDB,
};
