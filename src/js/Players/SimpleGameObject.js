// Базовый класс для игровых сущностей. Умеет ходить (занимать ячейку)
class SimpleGameObject {
    constructor(icon) {
        this.icon = icon;
    }
    // Занятие места в ячейке
    step(articles) {
        articles.innerText = this.icon;
        articles.classList.add("x");
    }
}