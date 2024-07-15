const numberInput = document.getElementById("number-input");
const checkBtn = document.getElementById("check-btn");
const hintResult = document.getElementById("hint-result");
const chancesText = document.getElementById("chances");

let answer = Math.floor(Math.random() * 100 + 1);
let chances = 10;
numberInput.focus();

const updateStatus = (color, text) => {
	hintResult.innerHTML = "";
	chancesText.innerHTML = `You have <strong>${chances}</strong> chances left!`;
	setTimeout(() => {
		hintResult.style.color = color;
		hintResult.innerHTML = text;
	}, 100);
}

const restartGame = () => {
	chances = 10;
	answer = Math.floor(Math.random() * 100 + 1);
	numberInput.value = "";
	numberInput.focus();
	checkBtn.textContent = "Check"
	updateStatus("white", "");

	checkBtn.addEventListener("click", checkInputValid);

	numberInput.addEventListener("keydown", (e) => {
		if(e.key === "Enter") {
			checkBtn.classList.add("button-active");
			checkBtn.click();
		}
	});

	numberInput.addEventListener("keyup", (e) => {
		if(e.key === "Enter") {
			checkBtn.classList.toggle("button-active");
		}
	})
}

const endGame = () => {
	checkBtn.textContent = "Restart";
	checkBtn.addEventListener("click", restartGame);
	numberInput.addEventListener("keydown", (e) => {
		if(e.key === "Enter") {
			checkBtn.classList.add("button-active");
			checkBtn.click();
		}
	});
	numberInput.addEventListener("keyup", (e) => {
		if(e.key === "Enter") {
			checkBtn.classList.toggle("button-active");
		}
	})
}

const checkInputValid = () => {
	const guess = parseInt(numberInput.value);
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

restartGame();