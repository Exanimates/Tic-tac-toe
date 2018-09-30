const gameLogic = new GameLogic("x",0,);
articles = document.getElementsByTagName('td');
for (var i = 0; i < articles.length; i++) {
	articles[i].addEventListener('click',gameLogic.currentStep);
}
const resetGame = document.getElementById("reset-game");
resetGame.addEventListener('click',gameLogic.removeBoard);

const showHistory = document.getElementById("buttonShowHistory");
showHistory.addEventListener('click',function () {
		const history = document.getElementById("history");
		if (history.style.display === ""){
			history.style.display = "flex";
		}else{
			history.style.display = "";
		}
})