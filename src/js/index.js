const gameLogic = new GameLogic();
var articles = $('.game > table  td');

// Добавление обработчиков события click
$(document).ready(function () {
	$('.fa-user-circle').click(function () {
		newParty();
	});
	$('.fa-desktop').click(function () {
		newParty();
		gameLogic.computer.randomStep($('.game > table  tr').length, gameLogic.board);
	});
	$('.show-history__buttons').click(function () {
		gameLogic.view.showBlock('.history', 'flex');
	});
	$('.header__help__button').click(function () {
		gameLogic.view.showBlock('.help-block', '');
	});
})
// Запуск новой игровой партии
function newParty() {
	gameLogic.view.restart($('.game table')[0]);
	$(articles).click(function () {
		gameLogic.clickOnCell(this);
	});
	gameLogic.view.showBlock($('.choose-player'));
}