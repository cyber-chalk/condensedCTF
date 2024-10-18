const express = require("express");
const mysql = require("mysql2");
// const { Pool } = require("pg"); // postgres client
const app = express();
const Port = 8080;
// app.use(express.static("public"));
// middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
// Set up PostgreSQL connection
// const pool = new Pool({
// 	user: "gorg",
// 	host: "db", // 'db' is the service name in docker-compose.yml
// 	database: "ledatabase",
// 	password: "yeah",
// 	port: 5432
// });

// const db = mysql.createConnection({
// 	host: "db", // 'db' service name in docker-compose.yml
// 	user: "root",
// 	password: "rootpassword",
// 	database: "ctf_db"
// });
const createConnection = () => {
	return mysql.createConnection({
		host: "db", // Use the service name defined in docker-compose
		user: "root",
		password: "rootpassword",
		database: "ctf_db"
	});
};

// Retry connecting to the database
const connectWithRetry = (retries = 5) => {
	const connection = createConnection();

	connection.connect((err) => {
		if (err) {
			if (retries > 0) {
				console.log(
					`Retrying database connection... (${5 - retries + 1})`
				);
				setTimeout(() => connectWithRetry(retries - 1), 2000); // Wait 2 seconds before retrying
			} else {
				console.error("Could not connect to database:", err);
				process.exit(1);
			}
		} else {
			console.log("Connected to database.");
		}
	});

	return connection;
};

app.get("/", (req, res) => {
	res.send(`
    <form method="POST" action="/login">
      Username: <input type="text" name="username"><br>
      Password: <input type="password" name="password"><br>
      <input type="submit" value="Login">
    </form>
  `);
});

app.post("/login", (req, res) => {
	const { username, password } = req.body;

	// Statement below is where the SQL injection comes into play.
	const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
	const connection = createConnection();

	connection.query(query, (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).send("yup, err " + err);
		}

		if (results.length > 0) {
			res.send(`Welcome, ${username}!`);
		} else {
			res.status(401).send("Invalid credentials!");
		}
	});
});

app.listen(Port, () => {
	console.log(`Server is running on port ${Port}`);
});
