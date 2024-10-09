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
};

const easein = (() => {
	let num = 20;
	const interval = 1000 / num; // doesnt really seem to be 1 second :|
	for (let i = 0; i < num; i++) {
		setTimeout(() => initGlitch(), i * interval);
	}
})(); // IIFE

// for (let i = 0; i < 8; i++) {
// 	initGlitch();
// }
