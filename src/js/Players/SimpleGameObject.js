export default class SimpleGameObject
{
     constructor(icon){
         this.icon = icon;
     }

     step(articles)
     {
        articles.innerText = this.icon;
        articles.classList.add("x");
     }
}