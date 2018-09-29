class GameLogic{

	constructor(){
		this.board = document.getElementById("board");
		this.message = document.getElementById("message");
		this.player = "X";
		this.stepCount = 0;
	}

	currentStep() {
		if (!this.textContent) {
			this.innerText = gameLogic.player;
			gameLogic.checkWin();
		}
	}

	checkWin(){
		var flag;
		var count = gameLogic.board.getElementsByTagName("tr").length;
		for(var i = 0; i < count; i++){
			var winRow = true,
				winColumn = true,
				winLeftTop = true,
				winLeftBottom = true;

			for(var k = 0; k < count; k++){
				if(gameLogic.board.rows[i].cells[k].innerHTML !== gameLogic.player) winRow = false;
				if(gameLogic.board.rows[k].cells[i].innerHTML !== gameLogic.player) winColumn = false;
				if(gameLogic.board.rows[k].cells[k].innerHTML !== gameLogic.player) winLeftTop = false;
				if(gameLogic.board.rows[count-1-k].cells[k].innerHTML !== gameLogic.player) winLeftBottom = false;
			}

			if(winRow || winColumn || winLeftTop || winLeftBottom){
				flag = true;
				gameLogic.removeEvent();
				break;
			}

		}
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
		}
	}

}


