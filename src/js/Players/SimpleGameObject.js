// Базовый класс для игровых сущностей. Умеет ходить (занимать ячейку)
export default class SimpleGameObject {
    constructor(icon) {
        this.icon = icon;
    }
    // Занятие места в ячейке
    step(x, y, view ,gameModel) {
        view.occupationCell(x, y, this.icon)
        gameModel[x][y] = this.icon;
    }
}