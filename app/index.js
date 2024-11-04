const express = require("express");
const mysql = require("mysql2");
const app = express();
const Port = 8080;
const fs = require("fs");
const { exec } = require("child_process");

app.use(express.json());
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
	console.log("I just did some crazy stuff")
	if (req.path === "/") {
		return res.sendFile(`/usr/src/app/app/public/index.html`);
	}
	res.sendFile(`/usr/src/app/app/public/${req.path}`);
});

// this is the endpoint that doesn't seem to be working!!!!!
// app.get("/GET_THE_STUPID_FLAG_YOU_STUPID_MACHINE", (req, res) => {
// 	console.log("getFlag endpoint hit! ");
// 	// res.json({ success: true, output: stdout.trim() }); // Send output
// });

app.post("/login", (req, res) => {
	// const { username, password } = {req.body.username, req.body.password};
	const username = req.body.username;
	const password = req.body.password;
	// Statement below is where the SQL injection comes into play.
	const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
	const connection = createConnection();

	let result;

	exec("/usr/src/app/app/public/.stupid_flag_exe_thing.out", (error, stdout, stderr) => {
		if (error) {
			console.error(`Error executing flag: ${error.message}`);
			return res.status(500).json({ success: false, message: "Execution failed", error: error.message });
		}
		if (stderr) {
			console.error(`Error output: ${stderr}`);
			return res.status(500).json({ success: false, message: "Execution failed", error: stderr });
		}
		console.log(stdout);
		result = stdout;
	});

	connection.query(query, (err, results) => {
		if (err) {
			console.error(err);
			return res
				.status(500)
				.json({ success: false, message: "yup error ", error: err });
		}

		if (results.length > 0) {
			res.json({ success: true, flag: result});
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

// app.get("/getFlag", (req, res) => {
// 	console.log("I want to excecute the file :(");
// 	// Use `exec` to execute the flag file
// 	exec("node ./public/flag", (error, stdout, stderr) => {
// 		if (error) {
// 			console.error(`Error executing flag: ${error.message}`);
// 			return res.status(500).json({ success: false, message: "Execution failed", error: error.message });
// 		}
// 		if (stderr) {
// 			console.error(`Error output: ${stderr}`);
// 			return res.status(500).json({ success: false, message: "Execution failed", error: stderr });
// 		}
// 		// Send the output of the flag file back to the client
// 		res.json({ success: true, output: stdout });
// 		console.log("I just excecuted the file!");
// 	});
// });	
