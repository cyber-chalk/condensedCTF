const express = require("express");
const { Pool } = require("pg"); // postgres client
const app = express();
const Port = 8080;
app.use(express.static("public"));
// Set up PostgreSQL connection
const pool = new Pool({
	user: "gorg",
	host: "db", // 'db' is the service name in docker-compose.yml
	database: "ledatabase",
	password: "yeah",
	port: 5432
});

app.get("/", async (req, res) => {
	try {
		const result = await pool.query("SELECT NOW()");
		res.send(`connection: ${result.rows[0].now}`);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error connecting to the database");
	}
});

app.listen(Port, () => {
	console.log(`Server is running on port ${Port}`);
});
