export default class View
{
     constructor(gameLogic)
     {
         this.gameLogic = gameLogic;
     }


	 // Добавление нового элемента в историю игр
	 addElementToHistory( board )
	 {
		 var historyBlock = document.getElementById("history");
		 var elementOfHistory = document.getElementById("board").cloneNode(true);
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