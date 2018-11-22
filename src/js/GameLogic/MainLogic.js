export default class MainLogic
{
	constructor()
	{
		this.board = document.getElementById("board"); //Игровое поле в виде таблицы
		this.compCountHtml = document.getElementById("computer-count"); // Счет компьютера
		this.playrCountHtml = document.getElementById("player-count"); // Счет игрока
		this.player = "x";
		this.stepCount = 0;
	}
	// Текущие нажатие на клетку
	currentStep(articles) 
	{
		// Проверка содержимого ячейки
		if (!articles.textContent) 
		{ 
			this.stepCount++;
			// Ход игрока
			if (this.player === "x")
				articles.innerText = this.player;
			articles.classList.add(this.player);
			
			var checkWin = this.checkWin();
			//Если победили, то обновляем данные и выходим из функции
			if(checkWin)
			{
				this.playrCountHtml.innerText = Number(this.playrCountHtml.innerText) + 1;
				swal({title: "Вы выиграли!",icon: "success",button: "Ok"});
				this.removeEvent();
				this.createTable();
				return;
			}else if (checkWin === false)
			//Если ничья, то выходим из функции
			{ 
				swal({title: "Ничья!",button: "Ok"});
				return;
			}
			
			//Ход компьютера
			this.changePlayer();
			if (this.player === "o")
			{
				this.computerStep();
				if(this.checkWin())
				{
					this.compCountHtml.innerText = Number(this.compCountHtml.innerText) + 1;
					swal({title: "Вы проиграли!",icon: "warning",button: "Ok",});
					this.removeEvent();
					this.createTable();
					return;
				}
				this.player = "x";
			}
		}
	}
	// Псевдо ИИ
	computerStep() 
	{
		const count = this.board.getElementsByTagName("tr").length;
		// Первые ход компьютера случайный
		if (this.stepCount === 1)
		{ 
			this.randomStep(count);
			return;
		}
		let tx = null, ty = null, tp = 0;
		let lC;
		for (let i = 0; i <= count - 1; i++)
		{
			for (let j = 0; j <= count - 1; j++)
			{
				lC = this.board.rows[i].cells[j];
				if (!lC.textContent)
				{
					this.board.rows[i].cells[j].innerHTML = "o";
					this.player = "o";
					if (this.checkWin())
					{
						lC = this.board.rows[i].cells[j].innerHTML;
						tp = 3;
						tx = i;
						ty = j;
						break;
					}
					this.board.rows[i].cells[j].innerHTML = "x";
					this.player = "x";
					if (this.checkWin())
					{
						lC = this.board.rows[i].cells[j].innerHTML;
						tx = i;
						ty = j;
						tp = 2;
					}
					this.board.rows[i].cells[j].innerHTML = "";
				}
			}
			if (tp === 3)
				break;
		}
		if (tp === 0)
		{
			for (let i = 0; i < count; i++)
			{
				for (let j = 0; j < count; j++)
				{
					if (!this.board.rows[i].cells[j].textContent)
					{
						this.board.rows[i].cells[j].innerHTML = "o";
						this.board.rows[i].cells[j].classList.add("o");
						return;
					}
				}
			}
		} else
		{
			this.board.rows[tx].cells[ty].innerHTML = "o";
			this.board.rows[tx].cells[ty].classList.add("o");
		}
	}

	// Случайный ход
	randomStep(count)
	{
		let i = Math.floor(Math.random() * (count - 1));
		let j = Math.floor(Math.random() * (count - 1));

		while (this.board.rows[i].cells[j].textContent)
		{	
			i = Math.floor(Math.random() * (count - 1) );
			j = Math.floor(Math.random() * (count - 1) );
		}
		this.board.rows[i].cells[j].innerHTML = "o";
		this.board.rows[i].cells[j].classList.add("o");
	}

	// Смена игрока
	changePlayer()
	{
		this.player === "x" ? (this.player = "o") : (this.player = "x");
	}

	// Проверка исхода партии
	checkWin()
	{
		//Маркер победы
		let flag; 
		// кол-во элементов на поле
		let countItems = 0;
		const count = this.board.getElementsByTagName("tr").length;
		for(var i = 0; i < count; i++)
		{
			var winRow = true,
				winColumn = true,
				winLeftTop = true,
				winLeftBottom = true;
			//Обходим таблицу и проверяем не сделал ли игрок или компьютер победных ход
			for(var k = 0; k < count; k++)
			{
				if (this.board.rows[i].cells[k].textContent) countItems++;
				if (this.board.rows[i].cells[k].innerHTML !== this.player) winRow = false;
				if (this.board.rows[k].cells[i].innerHTML !== this.player) winColumn = false;
				if (this.board.rows[k].cells[k].innerHTML !== this.player) winLeftTop = false;
				if (this.board.rows[count-1-k].cells[k].innerHTML !== this.player) winLeftBottom = false;
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
			this.removeEvent();
			this.createTable();
			return false;
		}
	}

	// Создание и добавление нового элемента в историю игр
	createTable()
	{
		var history = document.getElementById("history");
		var tableHistory = document.createElement("table");
		for (var i = 0; i < 3; i++)
		{
			const row = document.createElement("tr");
			for(var j = 0; j < 3; j++)
			{
				var td = document.createElement("td");
				td.innerHTML = this.board.rows[i].cells[j].innerHTML;
				td.classList = this.board.rows[i].cells[j].classList;
				row.appendChild(td);
			}
			tableHistory.appendChild(row);
		}
		history.appendChild(tableHistory);
	}

	// Удаления событий повешенных на <td>
	removeEvent()
	{
		const elements = this.board.getElementsByTagName("td");
		for (var i = 0; i < elements.length; i++)
		{
			var elClone = elements[i].cloneNode(true);
			elements[i].parentNode.replaceChild(elClone, elements[i]);
		}
	}
	// Перезагрузка игры
	restartGame()
	{
		const elements = this.board.getElementsByTagName("td");
		for (let i = 0; i < elements.length; i++)
		{
			elements[i].innerHTML = "";
			elements[i].classList.remove("x");
			elements[i].classList.remove("o");
			elements[i].addEventListener("click",()=>{
				this.currentStep(elements[i]);
			});
		}
		this.player = "x";
		this.stepCount = 0;
	}
}