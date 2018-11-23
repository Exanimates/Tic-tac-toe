export default class View
{
     constructor(gameLogic)
     {
         this.gameLogic = gameLogic;
     }

     // Добавление нового элемента в историю игр
	createTable(lengthBoard)
	{
		var historyBlock = document.getElementById("history");
		var elementOfHistory = document.createElement("table");
		for (let i = 0; i < lengthBoard; i++)
		{
			const row = document.createElement("tr");
			for(let j = 0; j < lengthBoard; j++)
			{
				var td = document.createElement("td");
				td.innerHTML = this.board.rows[i].cells[j].innerHTML;
				td.classList = this.board.rows[i].cells[j].classList;
				row.appendChild(td);
			}
			elementOfHistory.appendChild(row);
		}
		historyBlock.appendChild(elementOfHistory);
	}

	// Удаления событий повешенных на ячейке игрового поля
	removeEvent(board)
	{
		const elements = board.getElementsByTagName("td");
		for (let i = 0; i < elements.length; i++)
		{
			var elClone = elements[i].cloneNode(true);
			elements[i].parentNode.replaceChild(elClone, elements[i]);
		}
	}

	// Очисткая игрового поля
	static clearBoard(board)
	{
		const elements = board.getElementsByTagName("td");
		this.gameLogic.stepCount = 0;
		for (let i = 0; i < elements.length; i++)
		{
			elements[i].innerHTML = "";
			elements[i].classList.remove("x");
			elements[i].classList.remove("o");
			elements[i].addEventListener("click",()=>{
				this.gameLogic.currentStep(elements[i]);
			});
		}
	}
}