class View
{
     constructor(gameLogic)
     {
         this.gameLogic = gameLogic;
     }

	updateUi(message, alert, html_component)
	{
		if (arguments.length == 1)
		{
			swal({title:message});
		}
		if (arguments.length == 3)
		{
			html_component.innerText = Number(html_component.innerText) + 1;
			swal({title: message, icon: alert});
		}
		this.removeEvent(this.gameLogic.board);
		this.addElementToHistory(this.gameLogic.board);
	}

	 // Добавление нового элемента в историю игр
	 addElementToHistory(board)
	 {
		 var historyBlock = document.getElementById("history");
		 var elementOfHistory = board.cloneNode(true);
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
		for (let i = 0; i < elements.length; i++)
		{
			elements[i].innerHTML = "";
			elements[i].classList.remove("x");
			elements[i].classList.remove("o");
		}
	}
}