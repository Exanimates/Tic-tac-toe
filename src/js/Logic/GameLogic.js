// Класс с игровой логикой: ралзичные проверки/ходы игровых сущностей
class GameLogic {
	constructor() {
		// Инициализация нужных HTML элементов
		this.board = document.getElementById('game__board');
		this.compCountHtml = document.getElementById("computer-count"); 
		this.playerCountHtml = document.getElementById("player-count"); 

		this.gameModel = [ [], [], [] ];

		// Инициализация игровых объектов
		this.computer = new Computer("o");
		this.humanPlayer = new SimpleGameObject("x");

		// Подключение View с логикой обработки UI
		this.view = new View(this);

		// Отрисовка таблицы
		this.view.renderTable(2, this.board);
	}

	// Нажатие на клетку
	clickOnCell(cell) {
		// Проверка содержимого ячейки
		if (!cell.textContent) { 
			// Ход пользователя
			this.humanPlayer.step(cell, this.gameModel);
			//Проверка исхода партии
			if (this.checkGameState(this.humanPlayer) !== undefined){
				return;
			}
			// Ходим компьютером и проверяем повлиял ли его ход на исход партии
			this.computer.step(this.board, this.checkWin, this.humanPlayer, this.view.occupationCell);
			this.checkGameState(this.computer);
		}
	}

	// Проверка состояния игры
	checkGameState(gameobject) {
		var win = this.checkWin(this.board,gameobject);

		if(win) {
			if (gameobject instanceof Computer) {
				this.view.updateUiAfterEndParty( "Вы проиграли в партии", "warning", this.compCountHtml);
				return true;
			}
			this.view.updateUiAfterEndParty( "Вы победили в партии", "success", this.playerCountHtml);
			return true;	
		} else if (win === false) {
			this.view.updateUiAfterEndParty("Ничья");
			return false;
		}
	}

	// Проверка на победных ход в партии
	checkWin(board, player) {
		//Маркер победы
		let flag; 
		// Кол-во игровых элементов на поле
		let countItems = 0;
		const count = board.getElementsByTagName("tr").length;

		//Обходим таблицу и проверяем не сделал ли игрок или компьютер победных ход
		for (let i = 0; i < count; i++) {
			var winRow = true,
				winColumn = true,
				winLeftTop = true,
				winLeftBottom = true;

			for (let k = 0; k < count; k++) {
				if (board.rows[i].cells[k].textContent) countItems++;
				if (board.rows[i].cells[k].innerHTML !== player.icon) winRow = false;
				if (board.rows[k].cells[i].innerHTML !== player.icon) winColumn = false;
				if (board.rows[k].cells[k].innerHTML !== player.icon) winLeftTop = false;
				if (board.rows[count-1-k].cells[k].innerHTML !== player.icon) winLeftBottom = false;
			}
			//Если есть хоть одна победная комбинация, то выводим результаты и обновляем данные
			if(winRow || winColumn || winLeftTop || winLeftBottom) {
				flag = true;
				return flag;
			}
		}
		//Если победной комбинации не обнаружено и все ячейки заняты, то ничья
		if (!flag && (countItems === count * count)) {
			return false;
		}
	}
}