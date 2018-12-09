class View
{
	constructor(gameLogic){
		this.gameLogic = gameLogic;
	}
	
	// Обновление UI в зависимости от исхода партии
	updateUiAfterEndParty(message, alert, html_component) {
		if (arguments.length == 1) {
			swal({title:message});
		}
		if (arguments.length == 3) {
			html_component.innerText = Number(html_component.innerText) + 1;
			swal({title: message, icon: alert});
		}
		this.removeEvent(this.gameLogic.board);
		this.addElementToHistory(this.gameLogic.board);
		this.showBlock($('.choose-player'));
	}

	 // Добавление нового элемента в историю игр
	 addElementToHistory(board) {
		 var historyBlock = $('.history')[0];
		 var elementOfHistory = board.cloneNode(true);
		 historyBlock.appendChild(elementOfHistory);
	 }

	// Удаления событий повешенных на ячейки игрового поля
	removeEvent(board) {
		const elements = board.getElementsByTagName("td");
		$(elements).unbind();
	}

	// Рестарт игры
	restart(board) {
		const elements = $(board).find('td');
		for (let i = 0; i < elements.length; i++) {
			elements[i].innerHTML = "";
			elements[i].classList.remove("x");
			elements[i].classList.remove("o");
		}
		this.showBlock($('.choose-player'), "inline-block");
	}
	// Изменение видмости блока
	showBlock(element, blockStyle){
		if (!$(element).is(':visible')){
			$(element).fadeIn(250);
			$(element).css({'display': blockStyle});
		}	
		else
			$(element).fadeOut(250);
	}
}