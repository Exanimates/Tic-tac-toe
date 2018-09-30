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

			// Ход игрока
			if (gameLogic.player === "x")
				this.innerText = gameLogic.player;
			this.classList.add(gameLogic.player);
			if( gameLogic.checkWin())
				return;
			//Ход компьютера
			gameLogic.changePlayer();
			if (gameLogic.player === "o"){
				gameLogic.computerStep();
				if(gameLogic.checkWin()){
					return;
				}
				gameLogic.changePlayer();
			}
		}
	}
	// Псевдо ИИ
	computerStep(){
		var count = gameLogic.board.getElementsByTagName("tr").length;
		if (gameLogic.stepCount === 1){ // Первые два  хода компьютера случайные
			gameLogic.randomStep(count);
			return;
		}

		var number_x_elements = 0;
		var number_o_elements = 0;
		var toElement = null;
		// Проход по строкам
		for(var i =0; i < count; i++){
			if (toElement != null)
				break;
			for(var j = 0; j < count; j++){
				if(gameLogic.board.rows[i].cells[j].innerHTML === "x") {
					number_x_elements++; // Считаем сколько подряд крестиков
				}
				if(gameLogic.board.rows[i].cells[j].innerHTML === "o") {
					number_o_elements++; // Считаем сколько подряд ноликов
				}
				if (number_o_elements === 2){ //Проверяем может ли компьютер сделать победный ход
					var itemsInRow = false;
					for(var k = 0; k < count; k++){ // Проверяем идут ли нолики подряд
						if (gameLogic.board.rows[i].cells[k].textContent === "o")
							itemsInRow = true;
						else if (gameLogic.board.rows[i].cells[k].textContent === "x")
							itemsInRow = false;
					}
					if (itemsInRow){ // Если нолики идут подряд, то можно сделать победный ход
						for(var k = 0; k < count; k++){
							if (!gameLogic.board.rows[i].cells[k].textContent){
								toElement = gameLogic.board.rows[i].cells[k]; //Сохраняем ячейку
							}
						}
					}
				}
				if (number_x_elements === 2){ // Проверка на то может ли игрок сделать победный ход
					for(var k = 0; k < count; k++){ // Ищем ячейку в которую игрок может сделать победный ход
						if (toElement === null){
							if (!gameLogic.board.rows[i].cells[k].textContent)
								toElement = gameLogic.board.rows[i].cells[k];
						}
					}
				}
			}
			number_x_elements = 0;
			number_o_elements = 0;
		}
		// Обнуляем счетчики для следующей итерации
		number_x_elements = 0;
		number_o_elements = 0;
		// Проход по стоблцам
		for(var j =0; j < count; j++){
			for(var i = 0; i < count; i++){
				if(gameLogic.board.rows[i].cells[j].innerHTML === "x") {
					number_x_elements++;
				}
				if(gameLogic.board.rows[i].cells[j].innerHTML === "o") {
					number_o_elements++;
				}
				if (number_o_elements === 2){
					var itemsInRow = false;
					for(var k = 0; k < count; k++){
						if (gameLogic.board.rows[k].cells[j].textContent === "o")
							itemsInRow = true;
						else if (gameLogic.board.rows[k].cells[j].textContent === "x")
							itemsInRow = false;
					}
					if (itemsInRow){
						for(var k = 0; k < count; k++){
							if (!gameLogic.board.rows[k].cells[j].textContent){
									toElement = gameLogic.board.rows[k].cells[j];
							}
						}
					}
				}
				if (number_x_elements === 2){
					for(var k = 0; k < count; k++){
						if (!gameLogic.board.rows[k].cells[i].textContent){
							if (toElement === null){
								if (!gameLogic.board.rows[k].cells[j].textContent)
									toElement = gameLogic.board.rows[k].cells[j];
							}
						}
					}
				}
			}
			if (toElement != null)
				break;
			number_x_elements = 0;
			number_o_elements = 0;
		}
		number_x_elements = 0;
		number_o_elements = 0;
		//Проход по главной диагонали
		for (i = 0; i <count; i++){
			if (toElement !== null)
				break;
			if (gameLogic.board.rows[i].cells[i].innerHTML === "x"){
				number_x_elements++;
			}
			if (gameLogic.board.rows[i].cells[i].innerHTML === "o"){
				number_o_elements++;
			}

			if (number_o_elements === 2){
				var itemsInRow = false;
				for(var k = 0; k < count; k++){
					if (gameLogic.board.rows[k].cells[k].textContent === "o")
						itemsInRow = true;
					else if (gameLogic.board.rows[k].cells[k].textContent === "x")
						itemsInRow = false;
				}
				if (itemsInRow){
					for(var k = 0; k < count; k++){
						if (!gameLogic.board.rows[i].cells[i].textContent){
								toElement = gameLogic.board.rows[i].cells[i];
						}
					}
				}
			}
			if (number_x_elements === 2){
				for (i = 0; i <count; i++){
						if (!gameLogic.board.rows[i].cells[i].textContent){
							toElement = gameLogic.board.rows[i].cells[i];
						}


				}
			}

		}
		number_x_elements = 0;
		number_o_elements = 0;
		var i = 0;
		for (var j = count - 1; j >= 0; j--){
			if (toElement !== null)
				break;
			if (gameLogic.board.rows[i].cells[j].innerHTML === "x"){
				number_x_elements++;
			}
			if (gameLogic.board.rows[i].cells[j].innerHTML === "x"){
				number_o_elements++;
			}
			if (number_o_elements === 2){
				var itemsInRow = false;
				i = 0;
				for (j = count - 1; j >=0; j--){
					if (gameLogic.board.rows[i].cells[j].textContent === "o")
						itemsInRow = true;
					else if (gameLogic.board.rows[i].cells[j].textContent === "x")
						itemsInRow = false;
					i++;
				}
				if (itemsInRow){
					for(var j = 0; j >= 0; j--){
						if (!gameLogic.board.rows[i].cells[j].textContent){
							toElement = gameLogic.board.rows[i].cells[j];
						}
					}
				}
			}
			if (number_x_elements === 2){
				i = 0;
				for (j = count - 1; j >=0; j--){
					if (!gameLogic.board.rows[i].cells[j].textContent){
						toElement = gameLogic.board.rows[i].cells[j];
					}
					i++;
				}
			}
			i++;
		}
		//Если надо "обороняться" или "аттокавать", то обороняемся или аттакуем, иначе ищем свободную клетку для хода
		if (toElement != null){
			toElement.innerHTML = "o";
			toElement.classList.add("o");
		}else{
			for(var i =0; i <count; i++){
				for(var j =0; j<count; j++){
					if (!gameLogic.board.rows[i].cells[j].textContent){
						gameLogic.board.rows[i].cells[j].innerHTML = "o";
						gameLogic.board.rows[i].cells[j].classList.add("o");
						return;
					}
				}
			}
		}
	}

	// Случайный ход
	randomStep(count){
		var i = Math.floor(Math.random() * (count - 1) );
		var j = Math.floor(Math.random() * (count - 1) );
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
	changePlayer(){
		gameLogic.player === "x" ? (gameLogic.player = "o") : (gameLogic.player = "x");
	}

	// Проверка исхода партии
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
				return true;
			}

		}
		if (!flag && (countItems === count * count)){
			alert("Ничья");
			gameLogic.removeEvent();
			gameLogic.createTable();
			return true;
		}
		return false;
	}

	// Создание и добавление нового элемента в историю игр
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

	// Удаления функций по нажатию на <td>
	removeEvent(){
		var elements = gameLogic.board.getElementsByTagName("td");
		for (var i = 0; i < elements.length; i++) {
			elements[i].removeEventListener('click',gameLogic.currentStep);
		}
	}
	// Очистка игрового поля
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


