const startPageWrapper = document.getElementById("start-page-wrapper");
const gameTitle = document.getElementById("title");
const startBtn = document.getElementById("start-btn");

const settingsWrapper = document.getElementById("settings-wrapper");
const settingsCloseBtn = document.getElementById("settings-close-btn");
const settingsSaveBtn = document.getElementById("settings-save-btn");
const chancesInput = document.getElementById("chances");
const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");

const gameWrapper = document.getElementById("game-wrapper");
const promptText = document.getElementById("prompt");
const numberInput = document.getElementById("number-input");
const checkBtn = document.getElementById("check-btn");
const hintResult = document.getElementById("hint-result");
const chancesLeft = document.getElementById("chances-left");

const homeBtn = document.getElementById("home-btn");
const restartBtn = document.getElementById("restart-btn");
const settingsBtn = document.getElementById("settings-btn");

// default values for chances and answer
let totalChances = 10;
let chances = totalChances;
let min = 1;
let max = 100;
let answer = Math.floor(Math.random() * (max - min + 1) + min);

const updateStatus = (color, text) => {
	hintResult.innerHTML = "";
	chancesLeft.innerHTML = `You have <strong>${chances}</strong> chances left!`;
	setTimeout(() => {
		hintResult.style.color = color;
		hintResult.innerHTML = text;
	}, 100);
}

const updateCheckBtn = (state) => {
	// console.log(state.text);
	checkBtn.classList.remove("button-active");
	checkBtn.textContent = state.text;
	checkBtn.onclick = state.function;
	numberInput.onkeydown = (e) => {
		if(e.key === "Enter") {
			checkBtn.classList.add("button-active");
			checkBtn.click();
		}
	};
	numberInput.onkeyup = (e) => {
		if(e.key === "Enter") {
			checkBtn.classList.remove("button-active");
		}
	};
}

const showGame = () => {
	startPageWrapper.style.display = "none";
	settingsWrapper.style.display = "none";
	gameWrapper.removeAttribute("style");
}

const openSettings = () => {
	chancesInput.value = totalChances;
	minInput.value = min;
	maxInput.value = max;
	startPageWrapper.style.display = "none";
	gameWrapper.style.display = "none";
	settingsWrapper.removeAttribute("style");
	settingsCloseBtn.onclick = () => {
		let confirmClose = true;
		if(parseInt(chancesInput.value) !== totalChances || parseInt(minInput.value) !== min || parseInt(maxInput.value) !== max) {
			confirmClose = confirm("Close settings without saving?");
		}
		if(confirmClose) {
			showGame();
		}
	};
	settingsSaveBtn.onclick = () => {
		totalChances = parseInt(chancesInput.value);
		min = parseInt(minInput.value);
		max = parseInt(maxInput.value);
		if(totalChances && min && max) {
			restartGame();			
		} else {
			alert("Please enter a value for all fields!");
		}
	};
}

const restartGame = () => {
	showGame();
	chances = totalChances;
	answer = Math.floor(Math.random() * (max - min + 1) + min);
	promptText.textContent = `Guess a number between ${min} and ${max}`;
	numberInput.value = "";
	numberInput.disabled = false;
	numberInput.focus();
	updateStatus("white", "");
	updateCheckBtn(buttonFunctions[0]);

	homeBtn.addEventListener("click", titlePage);
	restartBtn.addEventListener("click", restartGame);
	settingsBtn.addEventListener("click", openSettings);
}

const endGame = () => {
	numberInput.disabled = true;
	updateCheckBtn(buttonFunctions[1]);
}

const checkInputValid = () => {
	const guess = parseInt(numberInput.value);
	// console.log("guessed:", guess);
	// console.log("min:", min);
	// console.log("max:", max);
	numberInput.value = "";
	if (guess === answer) {
		chances--;
		updateStatus("green", "Congratulations!");
		endGame();
	} else if (guess < answer && guess >= min) {
		chances--;
		if (chances === 0) {
			updateStatus("red", "You have <strong>lost</strong>...");
			endGame();
		} else {
			updateStatus("white", "Your guess is <strong>low</strong>");
		}
	} else if (guess > answer && guess <= max) {
		chances--;
		if (chances === 0) {
			updateStatus("red", "You have <strong>lost</strong>..");
			endGame();
		} else {
			updateStatus("white", "Your guess is <strong>high</strong>");
		}
	} else {
		updateStatus("red", "Your number is <strong>invalid</strong>");
	}
}

const titlePage = () => {
	gameWrapper.style.display = "none";
	settingsWrapper.style.display = "none";
	startPageWrapper.removeAttribute("style");
	startBtn.addEventListener("click", restartGame);
}

const buttonFunctions = [
	{
		text: "Check",
		function: checkInputValid
	},
	{
		text: "Restart",
		function: restartGame
	}
];

titlePage();