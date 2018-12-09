// Инициализируем игровую логику
const gameLogic = new GameLogic();

// Получаем ячейки игрового поля
var articles = $('.game > table  td');

// Добавление обработчиков события click
$(document).ready(function () {

	// Первый ход игрока
	$('.fa-user-circle').click(function () {
		newParty();
	});

	// Первый ход компьютера
	$('.fa-desktop').click(function () {
		newParty();
		gameLogic.computer.randomStep($('.game > table  tr').length, gameLogic.board, gameLogic.view.occupationCell);
	});

	// Показ/скрытие блоков
	$('.show-history__buttons').click(function () {
		gameLogic.view.showBlock('.history', 'flex');
	});
	$('.header__help__button').click(function () {
		gameLogic.view.showBlock('.help-block', '');
	});
});

// Запуск новой игровой партии
function newParty() {

	// Сброс UI игры в начало партии
	gameLogic.view.restart($('.game table')[0]);

	// Вешаем обработчик кликов на ячейки игрового поля
	$(articles).click(function () {
		gameLogic.clickOnCell(this);
	});
}