const gameLogic = new GameLogic();
var articles = document.getElementById("board").getElementsByTagName("td");

// Вешаем обработчики кликов
$(document).ready(function(){
	$('#user-icon').click(function() {
		gameLogic.view.restart(document.getElementById("board"));
		newParty();
	});
	$('#computer-icon').click(function() {
		newParty();
		gameLogic.computer.randomStep(gameLogic.board.getElementsByTagName("tr").length, gameLogic.board);
	});
	$('#buttonShowHistory').click(function() {
		gameLogic.view.showBlock('#history', 'flex');
	});
	$('.helpButton').click(function() {
		gameLogic.view.showBlock('#help-block', '');
	});
})
// Инициализация новой игровой партии
function newParty(){
	gameLogic.view.restart(document.getElementById("board"));
	$(articles).click(function(){
		gameLogic.clickOnCell(this);
	});
	gameLogic.view.showBlock(document.getElementById("playerMove"));
}