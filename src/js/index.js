const gameLogic = new GameLogic();

//На каждый элемент игрового поля вешаем функцию хода
var articles = document.getElementById("board").getElementsByTagName("td");
for (let i = 0; i < articles.length; i++) {
	articles[i].addEventListener("click", ()=>{
		gameLogic.currentStep(articles[i]);
	});
}

// По нажатию на кнопку reset-game очищаем игровое поле
const resetGame = document.getElementById("reset-game");

resetGame.addEventListener("click", ()=>{
	View.clearBoard(document.getElementById("board"));
	gameLogic.stepCount = 0;
	for (let i = 0; i < articles.length; i++) {
		articles[i].addEventListener("click", ()=>{
			gameLogic.currentStep(articles[i]);
		});
	}
});

// Скрываем/Показываем блок с историей игр
const showHistory = document.getElementById("buttonShowHistory");

showHistory.addEventListener("click", () => {  
	const history = document.getElementById("history");
	if (history.style.display === "")
	{
		history.style.display = "flex";
	}else{
		history.style.display = "";
	}
});