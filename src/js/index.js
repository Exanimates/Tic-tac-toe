const gameLogic = new GameLogic();
var articles = document.getElementById("board").getElementsByTagName("td");

// Добавление функций по нажатию на элементы
$(document).ready(function(){
	$('#user-icon').click(function() {
		gameLogic.view.restart(document.getElementById("board"));
		newParty();
	});
	$('#computer-icon').click(function() {
		newParty();
		gameLogic.computer.randomStep(gameLogic.board.getElementsByTagName("tr").length, gameLogic.board);
	});
	$('#button-show-history').click(function() {
		gameLogic.view.showBlock('#history', 'flex');
	});
	$('#help-button').click(function() {
		gameLogic.view.showBlock('#help-block', '');
	});
})
// Запуск новой игровой партии
function newParty(){
	gameLogic.view.restart(document.getElementById("board"));
	$(articles).click(function(){
		gameLogic.clickOnCell(this);
	});
	gameLogic.view.showBlock(document.getElementById("player-move"));
}