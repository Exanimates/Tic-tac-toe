class GameLogic{

	constructor(){
		this.board = document.getElementById("board"); //Игровое поле в виде таблицы
		this.compCountHtml = document.getElementById("computer-count"); // Счет компьютера
		this.playrCountHtml = document.getElementById("player-count"); // Счет игрока
		this.player = "x";
		this.stepCount = 0;
	}

	//Текущие нажатие на клетку
	currentStep() {
		if (!this.textContent) { // Проверка содержимого ячейки
			gameLogic.stepCount++;
			// Ход игрока
			if (gameLogic.player === "x")
				this.innerText = gameLogic.player;
			this.classList.add(gameLogic.player);
			var checkWin = GameLogic.checkWin();
			if( checkWin){ //Если победили, то обновляем данные и выходим из функции
				alert("Вы победили");
				gameLogic.playrCountHtml.innerText = Number(gameLogic.playrCountHtml.innerText) + 1;
				GameLogic.removeEvent();
				GameLogic.createTable();
				return;
			}else if (checkWin === false){ //Если ничья, то выходим из функции
				return;
			}
			//Ход компьютера
			GameLogic.changePlayer();
			if (gameLogic.player === "o"){
				GameLogic.computerStep();

				if(GameLogic.checkWin()){
					alert("Вы проиграли");
					gameLogic.compCountHtml.innerText = Number(gameLogic.compCountHtml.innerText) + 1;
					GameLogic.removeEvent();
					GameLogic.createTable();
					return;
				}
				gameLogic.player = "x";
			}
		}
	}
	// Псевдо ИИ
	static computerStep(){
		let j;
		let i;
		const count = gameLogic.board.getElementsByTagName("tr").length;
		if (gameLogic.stepCount === 1){ // Первые ход компьютер ходит случайно
			GameLogic.randomStep(count);
			return;
		}
		let tx = null, ty = null, tp = 0;
		let lC;
		for (i = 0; i <= count - 1; i++){
			for (j = 0; j <= count - 1; j++){
				lC = gameLogic.board.rows[i].cells[j];
				if (!lC.textContent){
					gameLogic.board.rows[i].cells[j].innerHTML = 'o';
					gameLogic.player = "o";
					if (GameLogic.checkWin()){
						lC = gameLogic.board.rows[i].cells[j].innerHTML;
						tp = 3;
						tx = i;
						ty = j;
						break;
					}
					gameLogic.board.rows[i].cells[j].innerHTML = 'x';
					gameLogic.player = "x";
					if (GameLogic.checkWin()){
						lC = gameLogic.board.rows[i].cells[j].innerHTML;
						tx = i;
						ty = j;
						tp = 2;
					}
					gameLogic.board.rows[i].cells[j].innerHTML = '';
				}
			}
			if (tp === 3)
				break;
		}
		if (tp === 0){
			for (i = 0; i < count; i++){
				for (j = 0; j < count; j++){
					if (!gameLogic.board.rows[i].cells[j].textContent){
						gameLogic.board.rows[i].cells[j].innerHTML = 'o';
						gameLogic.board.rows[i].cells[j].classList.add("o");
						return;
					}
				}
			}
		}else {
			gameLogic.board.rows[tx].cells[ty].innerHTML = 'o';
			gameLogic.board.rows[tx].cells[ty].classList.add("o");
		}
	}

	// Случайный ход
	static randomStep(count){
		let i = Math.floor(Math.random() * (count - 1));
		let j = Math.floor(Math.random() * (count - 1));
		while (true){
			if (!gameLogic.board.rows[i].cells[j].textContent){
				gameLogic.board.rows[i].cells[j].innerHTML = "o";
				gameLogic.board.rows[i].cells[j].classList.add("o");
				break;
			}
			else {
				i = Math.floor(Math.random() * (count - 1) );
				j = Math.floor(Math.random() * (count - 1) );
			}
		}

	}

	// Смена игрока
	static changePlayer(){
		gameLogic.player === "x" ? (gameLogic.player = "o") : (gameLogic.player = "x");
	}

	// Проверка исхода партии
	static checkWin(){
		let flag; //Маркер победы
		let countItems = 0;// кол-во элементов на поле
		const count = gameLogic.board.getElementsByTagName("tr").length;
		for(var i = 0; i < count; i++){
			var winRow = true,
				winColumn = true,
				winLeftTop = true,
				winLeftBottom = true;
			//Обходим таблицу и проверяем не сделал ли игрок или компьютер победных ход
			for(var k = 0; k < count; k++){
				if(gameLogic.board.rows[i].cells[k].textContent) countItems++;
				if(gameLogic.board.rows[i].cells[k].innerHTML !== gameLogic.player) winRow = false;
				if(gameLogic.board.rows[k].cells[i].innerHTML !== gameLogic.player) winColumn = false;
				if(gameLogic.board.rows[k].cells[k].innerHTML !== gameLogic.player) winLeftTop = false;
				if(gameLogic.board.rows[count-1-k].cells[k].innerHTML !== gameLogic.player) winLeftBottom = false;
			}
			//Если есть хоть одна победная комбинация, то выводим результаты и обновляем данные
			if(winRow || winColumn || winLeftTop || winLeftBottom){
				flag = true;
				return flag;
			}

		}
		//Если победной комбинации не обнаружено, а все ячейки заняты, то ничья
		if (!flag && (countItems === count * count)){
			alert("Ничья");
			GameLogic.removeEvent();
			GameLogic.createTable();
			return false;
		}
	}

	// Создание и добавление нового элемента в историю игр
	static createTable(){
		var history = document.getElementById("history");
		var tableHistory = document.createElement('table');
		for (var i = 0; i < 3; i++)
		{
			const row = document.createElement("tr");
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

	// Удаления функций по нажатию на <td>
	static removeEvent(){
		const elements = gameLogic.board.getElementsByTagName("td");
		for (var i = 0; i < elements.length; i++) {
			elements[i].removeEventListener('click',gameLogic.currentStep);
		}
	}
	// Очистка игрового поля
	static removeBoard(){
		const elements = gameLogic.board.getElementsByTagName("td");
		for (let i = 0; i < elements.length; i++) {
			elements[i].innerHTML = '';
			elements[i].classList.remove("x");
			elements[i].classList.remove("o");
			elements[i].addEventListener('click',gameLogic.currentStep);
		}
		gameLogic.player = "x";
		gameLogic.stepCount = 0;
	}

}


