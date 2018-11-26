const gameLogic = new GameLogic();

var articles = document.getElementById("board").getElementsByTagName("td");

addEvents();

function addEvents() {
	for (let i = 0; i <articles.length; i++) {
		articles[i].addEventListener("click", ()=>{
			gameLogic.clickOnCell(articles[i]);
		});
	}
}
 
function clearBoard() {
	View.clearBoard(document.getElementById("board"));
	gameLogic.stepCount = 0;
	addEvents();
}

function showHistory(context) {
	const history = document.getElementById("history");
	if (history.style.display === "")
	{
		context.innerText = "Скрыть историю партий"
		history.style.display = "flex";
	}else{
		context.innerText = "Показать историю партий"
		history.style.display = "";
	}
}