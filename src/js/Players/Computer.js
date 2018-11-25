import SimpleGameObject from "./SimpleGameObject.js"

export default class Computer extends SimpleGameObject
{
    constructor(icon)
    {
        super(icon);
    }

    step(board, checkWin, simpleGameObject) 
	{
		const count = board.getElementsByTagName("tr").length;
		// Первые ход компьютера случайный
		if (stepCount === 1)
		{ 
			randomStep(count);
			return;
		}
        let tx, ty; 
        let tp = 0;
		let lC;
		for (let i = 0; i <= count - 1; i++)
		{
			for (let j = 0; j <= count - 1; j++)
			{
				lC = board.rows[i].cells[j];
				if (!lC.textContent)
				{
					board.rows[i].cells[j].innerHTML = this.icon;
					if (checkWin(this.icon))
					{
						lC = board.rows[i].cells[j].innerHTML;
						tp = 3;
						tx = i;
						ty = j;
						break;
					}
					board.rows[i].cells[j].innerHTML = simpleGameObject.icon;
					if (checkWin(simpleGameObject.icon))
					{
						lC = board.rows[i].cells[j].innerHTML;
						tx = i;
						ty = j;
						tp = 2;
					}
					board.rows[i].cells[j].innerHTML = "";
				}
			}
			if (tp === 3)
				break;
		}
		if (tp === 0)
		{
			for (let i = 0; i < count; i++)
			{
				for (let j = 0; j < count; j++)
				{
					if (!board.rows[i].cells[j].textContent)
					{
						board.rows[i].cells[j].innerHTML = this.icon;
						board.rows[i].cells[j].classList.add("o");
						return;
					}
				}
			}
		} else
		{
			board.rows[tx].cells[ty].innerHTML = this.icon;
			board.rows[tx].cells[ty].classList.add("o");
		}
	}

	// Случайный ход
	randomStep( count, board )
	{
		let i = Math.floor(Math.random() * (count));
		let j = Math.floor(Math.random() * (count));

		while (board.rows[i].cells[j].textContent)
		{	
			i = Math.floor(Math.random() * (count) );
			j = Math.floor(Math.random() * (count) );
		}
		board.rows[i].cells[j].innerHTML = "o";
		board.rows[i].cells[j].classList.add("o");
	}
}