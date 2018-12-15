// Базовый класс для игровых сущностей. Умеет ходить (занимать ячейку)
class SimpleGameObject {
    constructor(icon) {
        this.icon = icon;
    }
    // Занятие места в ячейке
    step(articles, gameModel) {
        articles.innerText = this.icon;
        articles.classList.add("x");

        gameModel[articles.cellIndex] [articles.parentElement.rowIndex] = this.icon;
    }
}