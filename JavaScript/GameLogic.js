class GameLogic{

	constructor(){
		this.board = document.getElementById("board");
		this.compCountHtml = document.getElementById("computer-count");
		this.playrCountHtml = document.getElementById("player-count");
		this.player = "x";
		this.stepCount = 0;
		this.compCount = 0;
		this.playerCount = 0;
	}

	currentStep() {
		if (!this.textContent) {

			if (gameLogic.player === "x")
				this.innerText = gameLogic.player;
			this.classList.add(gameLogic.player);
			if( typeof gameLogic.checkWin() === "string" ){
				return;
			}
			gameLogic.changePlayer();
			if (gameLogic.player === "o"){
				gameLogic.computerStep();
				if( typeof gameLogic.checkWin() === "string" ){
					return;
				}
				gameLogic.changePlayer();
			}
		}
	}

	computerStep(){
		var count = gameLogic.board.getElementsByTagName("tr").length;
		if (gameLogic.stepCount === 1){
			gameLogic.randomStep(count);
			return;
		}
		if (gameLogic.checkPlayerStepInRow(count)){
			return;
		}
		if (gameLogic.checkPlayerStepInCells(count)){
			return;
		}
		gameLogic.checkPlayerStepInDiagonal(count);

	}

	randomStep(count){
		var i = Math.floor(Math.random() * (count - 1) );
		var j = Math.floor(Math.random() * (count - 1) );
		if (!gameLogic.board.rows[i].cells[j].textContent){
			gameLogic.board.rows[i].cells[j].innerHTML = "o";
			gameLogic.board.rows[i].cells[j].classList.add("o");
		}
		else {
			i = Math.floor(Math.random() * (count - 1) );
			j = Math.floor(Math.random() * (count - 1) );
			gameLogic.computerStep(i,j);
		}
	}

	checkPlayerStepInDiagonal(count){
		var number_x_elements = 0;
		for (i = 0; i <count; i++){
			if (gameLogic.board.rows[i].cells[i].innerHTML === "x"){
				number_x_elements++;
			}
			if (number_x_elements === 2){
				for (i = 0; i <count; i++){
					if (!gameLogic.board.rows[i].cells[i].textContent){
						gameLogic.board.rows[i].cells[i].innerHTML = "o";
						gameLogic.board.rows[i].cells[i].classList.add("o");
						number_x_elements = 0;
						return true;
					}

				}
			}
		}
		var i = 0;
		number_x_elements = 0;
		for (var j = count - 1; j >= 0; j--){
			if (gameLogic.board.rows[i].cells[j].innerHTML === "x"){
				number_x_elements++;
			}
			if (number_x_elements === 2){
				i = 0;
				for (j = count - 1; j >=0; j--){
					if (!gameLogic.board.rows[i].cells[j].textContent){
						gameLogic.board.rows[i].cells[j].innerHTML = "o";
						gameLogic.board.rows[i].cells[j].classList.add("o");
						number_x_elements = 0;
						return true;
					}
					i++;
				}
			}
			i++;
		}
		return false;
	}

	checkPlayerStepInRow(count){
		for(var i = 0; i < count; i++){
			var number_x_elements = 0;
			var number_o_elements = 0;
			for(var j = 0; j < count; j++){
				if(gameLogic.board.rows[i].cells[j].innerHTML === "x") {
					number_x_elements++;
				}
				if(gameLogic.board.rows[i].cells[j].innerHTML === "o") {
					number_o_elements++;
				}
				if (number_x_elements === 2){
					for(var k = 0; k < count; k++){
						if (!gameLogic.board.rows[i].cells[k].textContent){
							gameLogic.board.rows[i].cells[k].innerHTML = "o";
							gameLogic.board.rows[i].cells[k].classList.add("o");
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	checkPlayerStepInCells(count){
		for(var i = 0; i < count; i++){
			var number_x_elements = 0;
			var number_o_elements = 0;
			for(var j = 0; j < count; j++){
				if(gameLogic.board.rows[j].cells[i].innerHTML === "x") {
					number_x_elements++;
				}
				if(gameLogic.board.rows[j].cells[i].innerHTML === "o") {
					number_o_elements++;
				}
				if (number_x_elements === 2){
					for(var k = 0; k < count; k++){
						if (!gameLogic.board.rows[k].cells[i].textContent){
							gameLogic.board.rows[k].cells[i].innerHTML = "o";
							gameLogic.board.rows[k].cells[i].classList.add("o");
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	changePlayer(){
		gameLogic.player === "x" ? (gameLogic.player = "o") : (gameLogic.player = "x");
	}

	checkWin(){
		var flag;
		gameLogic.stepCount++;
		var countItems = 0;
		var count = gameLogic.board.getElementsByTagName("tr").length;
		for(var i = 0; i < count; i++){
			var winRow = true,
				winColumn = true,
				winLeftTop = true,
				winLeftBottom = true;

			for(var k = 0; k < count; k++){
				if(gameLogic.board.rows[i].cells[k].textContent) countItems++;
				if(gameLogic.board.rows[i].cells[k].innerHTML !== gameLogic.player) winRow = false;
				if(gameLogic.board.rows[k].cells[i].innerHTML !== gameLogic.player) winColumn = false;
				if(gameLogic.board.rows[k].cells[k].innerHTML !== gameLogic.player) winLeftTop = false;
				if(gameLogic.board.rows[count-1-k].cells[k].innerHTML !== gameLogic.player) winLeftBottom = false;
			}

			if(winRow || winColumn || winLeftTop || winLeftBottom){
				flag = true;
				const winString = gameLogic.player === "o" ? "Вы проиграли" : "Вы победили";
				if (gameLogic.player === "o")
					gameLogic.compCountHtml.innerText = Number(gameLogic.compCountHtml.innerText) + 1;
				else {
					gameLogic.playrCountHtml.innerText = Number(gameLogic.playrCountHtml.innerText) + 1;
				}
				alert(winString);
				gameLogic.removeEvent();
				gameLogic.createTable();
				return winString;
			}

		}
		if (!flag && (countItems === count * count)){
			alert("Ничья");
			gameLogic.removeEvent();
			gameLogic.createTable();
			return "Ничья";
		}
	}

	createTable(){
		var history = document.getElementById("history");
		var tableHistory = document.createElement('table');
		for (var i = 0; i < 3; i++)
		{
			var row = document.createElement("tr");
			for(var j = 0; j < 3; j++){
				var td = document.createElement("td");
				td.innerHTML = gameLogic.board.rows[i].cells[j].innerHTML;
				td.classList = gameLogic.board.rows[i].cells[j].classList;
				row.appendChild(td);
			}
			tableHistory.appendChild(row);
		}
		history.appendChild(tableHistory);
	}

	removeEvent(){
		var elements = gameLogic.board.getElementsByTagName("td");
		for (var i = 0; i < elements.length; i++) {
			elements[i].removeEventListener('click',gameLogic.currentStep);
		}
	}

	removeBoard(){
		var elements = gameLogic.board.getElementsByTagName("td");
		for (var i = 0; i < elements.length; i++) {
			elements[i].innerHTML = '';
			elements[i].classList.remove("x");
			elements[i].classList.remove("o");
			elements[i].addEventListener('click',gameLogic.currentStep);
		}
		gameLogic.player = "x";
		gameLogic.stepCount = 0;
	}

}


