import SimpleGameObject from './SimpleGameObject.js';

// Класс для игровой сущности компьютер. Умеет ходить взвешенно/случайно
export default class Computer extends SimpleGameObject {
	constructor(icon){
		super(icon);
	}

	// Взвешенный ход
	step(board, checkWin, simpleGameObject, view) {
		const count = board.length;

		// Приоритет хода.В зависмости от него компьютер обороняется/атакует 
		let priority = 0;
		// Индексы ячейки, которую нужно заполнить в завсимсоти от приоритета
		let px, py; 

		for (let i = 0; i <= count - 1; i++) {
			for (let j = 0; j <= count - 1; j++) {
				if (board[i][j] === "") {
					// Имитируем ход компьютера
					board[i][j] = this.icon;
					// Если ход компьютра победный, то сохраняем индексы ячейки
					if (checkWin(board, this)) {
						px = i;
						py = j;
						priority = 2;
						break;
					}
					// Имитируем ход пользователя
					board[i][j] = simpleGameObject.icon;
					// Если ход компьютра победный, то сохраняем индексы ячейки
					if (checkWin(board, simpleGameObject)) {
						px = i;
						py = j;
						priority = 1;
					}
					// Очищаем ячейку после симулированных ходов
					board[i][j] = "";
				}
			}
			// Если у комьютера есть возможность выиграть, то выходим из цикла
			if (priority === 2)
				break;
		}
		// Если приоритет не изменился, то компьютер ходит случайно
		if (priority === 0) {
			this.randomStep(count, board, view);
		} else {
			board[px][py] = this.icon;
			view.occupationCell(px, py, this.icon);
		}
	}

	// Случайный ход
	randomStep(count, board, view) {
		let i = Math.floor(Math.random() * (count));
		let j = Math.floor(Math.random() * (count));

		while (board[i][j] !== "") {
			i = Math.floor(Math.random() * (count) );
			j = Math.floor(Math.random() * (count) );
		}
		board[i][j] = this.icon;
		view.occupationCell(i, j, this.icon);
	}
}