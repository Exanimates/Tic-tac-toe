class GameLogic
{
	constructor()
	{
		this.board = document.getElementById("board"); //Игровое поле в виде таблицы
		this.compCountHtml = document.getElementById("computer-count"); // Счет компьютера
		this.playerCountHtml = document.getElementById("player-count"); // Счет игрока

		this.computer = new Computer("o");
		this.humanPlayer = new SimpleGameObject("x");

		this.view = new View(this);
		this.stepCount = 0;
	}
	// Текущие нажатие на клетку
	currentStep( cell ) 
	{
		// Проверка содержимого ячейки
		if ( !cell.textContent ) 
		{ 
			this.stepCount++;

			// Ход пользователя
			this.humanPlayer.step( cell );
			//Проверка 
			if ( this.checkGameState( this.humanPlayer ) !== undefined )
			{
				return;
			}
			// Ходим компьютером и проверяем повлиял ли его ход на исход партии
			this.computer.step( this.board, this.checkWin, this.humanPlayer, this.stepCount );
			this.checkGameState( this.computer );
		}
	}
	// Проверка исхода партии
	checkGameState( gameobject )
	{
		var win = this.checkWin( this.board, gameobject );
		if( win )
		{
			if ( gameobject instanceof SimpleGameObject )
			{
				if ( gameobject instanceof Computer )
				{
					this.view.updateUiAfterWin( this.compCountHtml, "Вы проиграли в партии", "warning" );
					return;
				}
				this.view.updateUiAfterWin( this.playerCountHtml, "Вы победили в партии", "success" );
			}
			return true;
		}
		else if ( win === false )
		//Если ничья, то выходим из функции
		{ 
			this.view.updateUiAfterTie("Ничья");
			return false;
		}
	}

	// Проверка на победных ход в партии
	checkWin( board, player )
	{
		//Маркер победы
		let flag; 
		// кол-во элементов на поле
		let countItems = 0;
		const count = board.getElementsByTagName("tr").length;
		for(let i = 0; i < count; i++)
		{
			var winRow = true,
				winColumn = true,
				winLeftTop = true,
				winLeftBottom = true;
			//Обходим таблицу и проверяем не сделал ли игрок или компьютер победных ход
			for(let k = 0; k < count; k++)
			{
				if (board.rows[i].cells[k].textContent) countItems++;
				if (board.rows[i].cells[k].innerHTML !== player.icon) winRow = false;
				if (board.rows[k].cells[i].innerHTML !== player.icon) winColumn = false;
				if (board.rows[k].cells[k].innerHTML !== player.icon) winLeftTop = false;
				if (board.rows[count-1-k].cells[k].innerHTML !== player.icon) winLeftBottom = false;
			}
			//Если есть хоть одна победная комбинация, то выводим результаты и обновляем данные
			if(winRow || winColumn || winLeftTop || winLeftBottom)
			{
				flag = true;
				return flag;
			}
		}
		//Если победной комбинации не обнаружено, а все ячейки заняты, то ничья
		if (!flag && (countItems === count * count))
		{
			return false;
		}
	}
}