const gameLogic = new GameLogic();
articles = document.getElementsByTagName('td');
for (var i = 0; i < articles.length; i++) {
	articles[i].addEventListener('click',gameLogic.currentStep);
}