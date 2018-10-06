const gameLogic = new GameLogic("x",0,);
articles = document.getElementsByTagName('td');
for (var i = 0; i < articles.length; i++) {
	articles[i].addEventListener('click',gameLogic.currentStep); //на каждый элемент игрового поля вешаем функция хода
}
const resetGame = document.getElementById("reset-game");
resetGame.addEventListener('click',GameLogic.removeBoard); // По нажатию на кнопку reset-game удаляем поле

const showHistory = document.getElementById("buttonShowHistory");
showHistory.addEventListener('click',function () {  // Скрываем/Показываем блок с историей игр
		const history = document.getElementById("history");
		if (history.style.display === ""){
			history.style.display = "flex";
		}else{
			history.style.display = "";
		}
})