const express = require("express");
const mysql = require("mysql2");
const app = express();
const Port = 8080;
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

const createConnection = () => {
	return mysql.createConnection({
		host: "db", // Use the service name defined in docker-compose
		user: "root",
		password: "rootpassword",
		database: "ctf_db"
	});
};

// app.get("/", (req, res) => {
// 	res.send(`
//     <form method="POST" action="/login">
//       Username: <input type="text" name="username"><br>
//       Password: <input type="password" name="password"><br>
//       <input type="submit" value="Login">
//     </form>
//   `);
// });
app.get("/*", (req, res) => {
	if (req.path === "/") {
		return res.sendFile(`/usr/src/app/app/public/index.html`);
	}
	res.sendFile(`/usr/src/app/app/public/${req.path}`);
});

app.post("/login", (req, res) => {
	// const { username, password } = {req.body.username, req.body.password};
	const username = req.body.username;
	const password = req.body.password;
	// Statement below is where the SQL injection comes into play.
	const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
	const connection = createConnection();

	connection.query(query, (err, results) => {
		if (err) {
			console.error(err);
			return res
				.status(500)
				.json({ success: false, message: "yup error ", error: err });
		}

		if (results.length > 0) {
			res.json({ success: true });
		} else {
			res.status(200).json({
				success: false
			}); // have to send 200 otherwise browser throws err
		}
	});
});

app.listen(Port, () => {
	console.log(`Server is running on port ${Port}`);
});
