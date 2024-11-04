// Congratulations on getting this far!\nHere's one final challenge for you to solve:\n\nThe first char is shifted up by one ASCII value, the second down by 2, third up by 3, etc... All between the range 126 and 33.\nGoodluck.\n\n ${flagText}</h3>`;

const sendAdmin = (element) => {
	element.src = "./images/clicked.svg";
	setTimeout(() => {
		document.getElementById("download-container").style.display = "none";
		process();
	}, 250);
};

function randomGaussian(mean, stddev) {
	let u = 1 - Math.random();
	let v = 1 - Math.random();
	let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
	return z * stddev + mean;
}

const initGlitch = () => {
	let img = document.createElement("img");
	img.src = "./images/Error.svg";
	img.classList.add("layers");
	document.body.append(img);
	// let img = document.createElement("div");
	// img.style = "width: 10px; height: 10px; background-color: white;";
	// document.body.append(img);
	// img.style.position = "absolute";

	img.onload = () => {
		const dev = 4; // play with this number
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;
		const stddevX = window.innerWidth / dev;
		const stddevY = window.innerHeight / dev;

		// img.style.top = randomNearCenter(centerY) - imgWidth / 2 + "px";
		// img.style.left = randomNearCenter(centerX) - imgHeight / 2 + "px";
		let x = randomGaussian(centerX, stddevX);
		let y = randomGaussian(centerY, stddevY);
		img.style.left = `${x}px`;
		img.style.top = `${y}px`;
	};
	const randomInt = Math.floor(Math.random() * 4) - 1;
	if (randomInt) {
		easein(
			() => {
				img.style.filter = "grayscale(100%)";
			},
			1,
			1500
		);
	}
};

const easein = (func, num, time) => {
	const interval = time / num; // doesnt really seem to be 1 second :p
	for (let i = 1; i <= num; i++) {
		setTimeout(() => func(), i * interval);
	}
};

const process = () => {
	easein(initGlitch, 22, 1000); // #ihateobjects :)
	setTimeout(() => {
		console.log("Enemy spy is in the base, protect the brief case!");
		// document.body.querySelectorAll("*").forEach((element) => {
		// 	element.style.display = "none";
		// });
		document.body
			.querySelectorAll(".layers")
			.forEach((element) => element.remove());

		const panel = document.getElementById("input-container2");
		const cable = document.getElementById("cable");

		[...document.body.getElementsByClassName("hidden")].forEach(
			(element) => {
				if (element == panel) {
					cable.addEventListener("animationend", () => {
						panel.classList.remove("hidden");
					});
					return; // return acts as continue since its a foreach
				}

				element.classList.remove("hidden");
			}
		); // kind of yucky
	}, 3000);
};
// process();

async function sends(element) {
	console.log(element);
	// element.style.animation = "none";
	element.classList.add("animate-pull2");
	let inputs = document.querySelectorAll("input");
	let response = await fetch("/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json" // can also use 'application/x-www-form-urlencoded'
		},
		body: JSON.stringify({
			username: inputs[0].value,
			password: inputs[1].value
		})
	});
	const result = await response.json();
	if (result.error) return console.log(result.error);

	element.addEventListener(
		"animationend",
		() => {
			element.classList.remove("animate-pull2");
			console.log(result, "res", response);
			if (result.success == false) return;

			document.getElementById("final-text").innerHTML = `<h3 style="font-weight: 400">Congratulations on getting this far! Here's one final challenge for you to solve: The first char is shifted up by one ASCII value, the second down by 2, third up by 3, etc... All between the range 126 and 33. Goodluck. ${result.flag}</h3>`;

			let divArr = [...document.getElementsByTagName("div")];
			for (let i = 0; i < divArr.length; i++) {
				divArr[i].style.display = "none";
			}
			loading();
		},
		{ once: true }
	); // { once: true } ensures this event listener is removed after it runs once
}

const loading = () => {
	console.log("I'm loading lol");
	let element = document.getElementById("loading-container");
	element.style.display = "flex";
	document
		.getElementById("progress-bar")
		.addEventListener("animationend", () => {
			element.style.display = "none";
			data();
		});
};

const data = () => {
	document.getElementById("final-container").style.display = "flex";
	document.getElementById("final-text").style.display = "flex";
	//fetchFlag();
};

// async function fetchFlag() {
// 	console.log("I'm about to try fetching the flag!!");
// 	try {
// 		let response = await fetch("/getFlag");
// 		if (!response.ok) {
// 			throw new Error(`HTTP error! status: ${response.status}`);
// 		}
// 		let result = await response.json();
// 		if (result.success) {
// 			document.getElementById("final-text").innerHTML = `<h3 style="font-weight: 400">Flag: ${result.output.trim()}</h3>`;
// 		} else {
// 			console.error("Failed to fetch flag:", result.message);
// 		}
// 	} catch (error) {
// 		console.error("Error fetching flag:", error);
// 	}
// }


// loading();
