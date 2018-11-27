const gameLogic = new GameLogic();
var articles = document.getElementById("board").getElementsByTagName("td");

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
function newParty(){
	gameLogic.view.restart(document.getElementById("board"));
	for (let i = 0; i <articles.length; i++) {
		articles[i].addEventListener("click", ()=>{
			gameLogic.clickOnCell(articles[i]);
		});
	}
	gameLogic.view.showBlock(document.getElementById("playerMove"));
}