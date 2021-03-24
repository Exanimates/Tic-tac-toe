import Computer from '../Players/Computer.js';
import SimpleGameObject from '../Players/SimpleGameObject.js';
import View from '../View/View.js';

// Класс с игровой логикой: ралзичные проверки/ходы игровых сущностей
export default class GameLogic {
	constructor(lengthBoard) {

		// Инициализация игровой модели
		this.gameModel = [ ];

		// Задаем размер игрового поля
		this.lengthBoard = lengthBoard;

		// Инициализация игровых объектов
		this.computer = new Computer("o");
		this.humanPlayer = new SimpleGameObject("x");

		// Подключение View с логикой обработки UI
		this.view = new View(this);

		// Отрисовка таблицы
		this.view.renderTable(lengthBoard);

		// Создание игровой модели в зависимости от размеров
		this.createGameModel();
	}

	// Нажатие на клетку
	clickOnCell(cell) {
		// Проверка содержимого ячейки
		if (!cell.textContent) { 
			// Ход пользователя
			this.humanPlayer.step(cell.parentElement.rowIndex, cell.cellIndex, this.view, this.gameModel);
			//Проверка исхода партии
			if (this.checkGameState(this.humanPlayer) !== undefined){
				return;
			}
			// Ходим компьютером и проверяем повлиял ли его ход на исход партии
			this.computer.step(this.gameModel, this.checkWin, this.humanPlayer, this.view);
			this.checkGameState(this.computer);
		}
	}

	// Проверка состояния игры
	checkGameState(gameobject) {
		var win = this.checkWin(this.gameModel,gameobject);

		if(win) {
			if (gameobject instanceof Computer) {
				this.view.updateUiAfterEndParty( "Вы проиграли в партии", "warning");
				return true;
			}
			this.view.updateUiAfterEndParty( "Вы победили в партии", "success");
			return true;	
		} else if (win == false) {
			this.view.updateUiAfterEndParty("Ничья");
			return false;
		}
	}

	// Проверка на победных ход в партии
	checkWin(gameModel, player) {
		//Маркер победы
		let flag; 
		// Кол-во игровых элементов на поле
		let countItems = 0;
		const count = gameModel.length;

		//Обходим таблицу и проверяем не сделал ли игрок или компьютер победных ход
		for (let i = 0; i < count; i++) {
			var winRow = true,
				winColumn = true,
				winLeftTop = true,
				winLeftBottom = true;

			for (let k = 0; k < count; k++) {
				if (gameModel[i][k]) countItems++;
				if (gameModel[i][k] !== player.icon) winRow = false;
				if (gameModel[k][i] !== player.icon) winColumn = false;
				if (gameModel[k][k] !== player.icon) winLeftTop = false;
				if (gameModel[count-1-k][k] !== player.icon) winLeftBottom = false;
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

	// Создание игровой модели
	createGameModel(){
		for (let i = 0; i < this.lengthBoard; i++) {
			this.gameModel[i] = new Array(this.lengthBoard + 1);
		}

		for (let i = 0; i < this.lengthBoard; i++) {
			for (let k = 0; k < this.lengthBoard; k++) {
				this.gameModel[i][k] = "";
			}
		}
	}

	// Очистка игровой модели
	clearModel(){
		for (let i = 0; i < this.lengthBoard; i++) {
			for (let k = 0; k < this.lengthBoard; k++) {
				this.gameModel[i][k] = "";
			}
		}
	}
}
