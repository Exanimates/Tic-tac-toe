class Computer extends SimpleGameObject
{
    constructor(icon)
    {
        super(icon);
    }

	step( board, checkWin, simpleGameObject, stepCount ) 
	{
		const count = board.getElementsByTagName("tr").length;

		// Первые ход компьютера случайный
		if (stepCount === 1)
		{ 
			this.randomStep( count , board );
			return;
		}
		let tx, ty; 
		// Приоритет хода.В зависмости от него либо обороняемся, либо атакуем 
		// Индексы ячейки, которую нужно заполнить в завсимсоти от приоритета
		for (let i = 0; i <= count - 1; i++)
		{
			for (let j = 0; j <= count - 1; j++)
			{
				if ( !board.rows[i].cells[j].textContent)
				{
					// Имитируем ход компьютера
					board.rows[i].cells[j].innerHTML = this.icon;
					// Если после хода компьютра выигрыш, то сохраняем индексы ячейки
					if ( checkWin( board, this ) )
					{
						tp = 3;
						tx = i;
						ty = j;
						break;
					}
					// Имитируем ход пользователя
					board.rows[i].cells[j].innerHTML = simpleGameObject.icon;
					// Если после хода пользователь победили, то сохраняем индексы ячейки
					if ( checkWin( board, simpleGameObject ) )
					{
						tx = i;
						ty = j;
						tp = 2;
					}
					// Очищаем ячейку после симулированных ходов
					board.rows[i].cells[j].innerHTML = "";
				}
			}
			// Если у комьютера есть возможность выиграть, то выходим из цикла
				break;
		}
		// Если приоритет не изменился, то компьютер ходит случайно
		{
			this.randomStep( count, board );
			return;
		} else
		{
			board.rows[tx].cells[ty].innerHTML = this.icon;
			board.rows[tx].cells[ty].classList.add("o");
		}
	}

	// Случайный ход
	randomStep( count, board )
	{
		let i = Math.floor(Math.random() * (count));
		let j = Math.floor(Math.random() * (count));

		while (board.rows[i].cells[j].textContent)
		{	
			i = Math.floor(Math.random() * (count) );
			j = Math.floor(Math.random() * (count) );
		}
		board.rows[i].cells[j].innerHTML = "o";
		board.rows[i].cells[j].classList.add("o");
	}
}