let model = (function() {
	const data = {
		numSquares:6,
		colors: [],
		pickedColor: '',
	};
	return {
		getData() {
			return data;
		},
		generateRandomColors(num) {
      // make an array
			let arr = [];
      // add num colors to arr
			for (var i = 0; i < num; i++) {
        // get random color and push into arr
				arr.push(this.randomColor());
			}
      // return that array
			return arr;
		},
		randomColor() {
      // pick a 'red' from 0 -255
			let r = Math.floor(Math.random() * 256),
      // pick a 'green' from 0 -255
				g = Math.floor(Math.random() * 256),
      // pick a 'blue' from 0 -255
				b = Math.floor(Math.random() * 256);
			return 'rgb(' + r + ', ' + g + ', ' + b + ')';
		},
		pickColor() {
			let random = Math.floor(Math.random() * data.colors.length);
			return data.colors[random];
		}

	};

})();

let view = (function() {
	const domStrings = {
		container: '.container',
		squares: '.square',
		colorDisplay: '#colorDisplay',
		messageDisplay: '#messageDisplay',
		h1: 'h1',
		resetButton: '#reset',
		modeButtons: '.mode'
	};
  
	const domNodes = {
		squares: document.querySelectorAll(domStrings.squares),
		modeButtons: document.querySelectorAll(domStrings.modeButtons),
		colorDisplay: document.querySelector(domStrings.colorDisplay),
		h1: document.querySelector(domStrings.h1),
		resetButton: document.querySelector(domStrings.resetButton),
		messageDisplay: document.querySelector(domStrings.messageDisplay)

	};

	return {
		getDomStrings() {
			return domStrings;
		},
		initModeButtons(modeButton, numSquares) {
      // modeButton.classList.add('selected');
      // modeButton.textContent === 'Easy' ? numSquares = 3: numSquares = 6;
			for (var i = 0; i < domNodes.modeButtons.length; i++) {
				domNodes.modeButtons[0].classList.remove('selected');
				domNodes.modeButtons[1].classList.remove('selected');
				modeButton.classList.add('selected');
				modeButton.textContent === 'Easy' ? numSquares = 3: numSquares = 6;
				return numSquares;
        
			}
      // this.resetColors(colors, pickedColor);
		},
		resetColors(colors, pickedColor) {
     
  // change colorDisplay to mach picked Color
			domNodes.colorDisplay.textContent = pickedColor;
			domNodes.resetButton.textContent = 'New Colors';
			domNodes.messageDisplay.textContent = '';
  // change colors of squares
			for (var i = 0; i < domNodes.squares.length; i++) {
				if (colors[i]) {
					domNodes.squares[i].style.display = 'block';
					domNodes.squares[i].style.background = colors[i];
				} else {
					domNodes.squares[i].style.display = 'none';
				}
			}
			domNodes.h1.style.background = 'steelblue';
		},
		changeColors(color) {
  // loop through all squares
			for (let square of domNodes.squares) {
  // change each color to match given color
				square.style.background = color;
			}
		}
	};
})();

let controller = (function(model, view) {
	const domStrings = view.getDomStrings();
	const data = model.getData();

	const container = document.querySelector(domStrings.container),
		squares = document.querySelectorAll(domStrings.squares),
		colorDisplay = document.querySelector(domStrings.colorDisplay),
		messageDisplay = document.querySelector(domStrings.messageDisplay),
		h1 = document.querySelector(domStrings.h1),
		resetButton = document.querySelector(domStrings.resetButton),
		modeButtons = document.querySelectorAll(domStrings.modeButtons);

	function setupEventListeners() {
		resetButton.addEventListener('click', () => {
			for (let mode of modeButtons) {
        // modeButtons[mode].classList.remove('selected');
				mode.removeAttribute('disabled');
			}
			data.numSquares = 6;
			reset();
		});
		for (var i = 0; i < modeButtons.length; i++) {
			modeButtons[i].addEventListener('click', function() {
				let numSquaresChanged = view.initModeButtons(this, data.numSquares);
				data.numSquares = numSquaresChanged;
				reset();
			});
		}
		container.addEventListener('click', setupSquares);
	}

	function setupSquares(e) {
		let target = e.target;
		for (let i = 0; i < squares.length; i++) {
			if (target === squares[i]) {
				let clickedColor = target.style.background;
        //compare color to pickedcolor
				if (clickedColor === data.pickedColor) {
					view.changeColors(clickedColor);
					messageDisplay.textContent = 'Correct!';
					resetButton.textContent = 'Play Again';
					h1.style.background = clickedColor;
					for (let mode = 0; mode < modeButtons.length; mode++) {
						modeButtons[mode].classList.remove('selected');
						modeButtons[mode].setAttribute('disabled', 'true');
					}
				} else {
					target.style.background = '#232323';
					messageDisplay.textContent = 'Try Again';
				} 
			}
    
		}
	}

	function reset() {
    // generate all new colors
		if (arguments[0] !== undefined || arguments[0] !== null) {
			data.colors = model.generateRandomColors(data.numSquares);
		} else {
			data.colors = model.generateRandomColors(arguments[0]);
		}
  // pick a new random color from array
		data.pickedColor = model.pickColor();
		view.resetColors(data.colors, data.pickedColor);
	}
	return {
		init() {
			setupEventListeners();
			reset();
		}
	};
})(model, view);

controller.init();
