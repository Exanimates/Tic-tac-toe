class Computer extends SimpleGameObject
{
    constructor(icon)
    {
        super(icon);
    }

	step(board, checkWin, simpleGameObject)
	{
		const count = board.getElementsByTagName("tr").length;

		// Приоритет хода.В зависмости от него либо обороняемся, либо атакуем 
		let priority = 0;
		// Индексы ячейки, которую нужно заполнить в завсимсоти от приоритета
		let px, py; 

		for (let i = 0; i <= count - 1; i++)
		{
			for (let j = 0; j <= count - 1; j++)
			{
				if (!board.rows[i].cells[j].textContent)
				{
					// Имитируем ход компьютера
					board.rows[i].cells[j].innerHTML = this.icon;
					// Если после хода компьютра выигрыш, то сохраняем индексы ячейки
					if (checkWin(board, this))
					{
						px = i;
						py = j;
						priority = 2;
						break;
					}
					// Имитируем ход пользователя
					board.rows[i].cells[j].innerHTML = simpleGameObject.icon;
					// Если после хода пользователь победили, то сохраняем индексы ячейки
					if (checkWin(board, simpleGameObject))
					{
						px = i;
						py = j;
						priority = 1;
					}
					// Очищаем ячейку после симулированных ходов
					board.rows[i].cells[j].innerHTML = "";
				}
			}
			// Если у комьютера есть возможность выиграть, то выходим из цикла
			if (priority === 2)
				break;
		}
		// Если приоритет не изменился, то компьютер ходит случайно
		if (priority === 0)
		{
			this.randomStep(count, board);
		} else
		{
			board.rows[px].cells[py].innerHTML = this.icon;
			board.rows[px].cells[py].classList.add("o");
		}
	}

	// Случайный ход
	randomStep(count, board)
	{
		let i = Math.floor(Math.random() * (count));
		let j = Math.floor(Math.random() * (count));

		while (board.rows[i].cells[j].textContent)
		{	
			i = Math.floor(Math.random() * (count) );
			j = Math.floor(Math.random() * (count) );
		}
		board.rows[i].cells[j].innerHTML = this.icon;
		board.rows[i].cells[j].classList.add("o");
	}
}