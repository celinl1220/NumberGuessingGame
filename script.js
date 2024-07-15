const startPageWrapper = document.getElementById("start-page-wrapper");
const gameTitle = document.getElementById("title");
const startBtn = document.getElementById("start-btn");

const gameWrapper = document.getElementById("game-wrapper");
const numberInput = document.getElementById("number-input");
const checkBtn = document.getElementById("check-btn");
const hintResult = document.getElementById("hint-result");
const chancesText = document.getElementById("chances");

const homeBtn = document.getElementById("home-btn");
const restartBtn = document.getElementById("restart-btn");

let answer = Math.floor(Math.random() * 100 + 1);
let chances = 10;

const updateStatus = (color, text) => {
	hintResult.innerHTML = "";
	chancesText.innerHTML = `You have <strong>${chances}</strong> chances left!`;
	setTimeout(() => {
		hintResult.style.color = color;
		hintResult.innerHTML = text;
	}, 100);
}

const updateButtons = (state) => {
	// console.log(state.text);
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
			checkBtn.classList.toggle("button-active");
		}
	};
}

const restartGame = () => {
	// console.log("restartGame()");
	startPageWrapper.style.display = "none";
	gameWrapper.removeAttribute("style");
	chances = 10;
	answer = Math.floor(Math.random() * 100 + 1);
	numberInput.value = "";
	numberInput.disabled = false;
	numberInput.focus();
	// checkBtn.textContent = "Check"
	updateStatus("white", "");
	updateButtons(buttonFunctions[0]);

	// console.log("answer:", answer);

	homeBtn.addEventListener("click", titlePage);
	restartBtn.addEventListener("click", restartGame);
}

const endGame = () => {
	// console.log("endgame()");
	numberInput.disabled = true;
	updateButtons(buttonFunctions[1]);
	// checkBtn.textContent = "Restart";
	// checkBtn.addEventListener("click", restartGame);
}

const checkInputValid = () => {
	const guess = parseInt(numberInput.value);
	// console.log("guessed:", guess);
	numberInput.value = "";
	// chancesText.textContent = `ans: ${answer}, guess: ${guess}`;
	if (guess === answer) {
		chances--;
		updateStatus("green", "Congratulations!");
		endGame();
	} else if (guess < answer && guess > 0) {
		chances--;
		if (chances === 0) {
			updateStatus("red", "You have <strong>lost</strong>...");
			endGame();
		} else {
			updateStatus("white", "Your guess is <strong>low</strong>");
		}
	} else if (guess > answer && guess < 101) {
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