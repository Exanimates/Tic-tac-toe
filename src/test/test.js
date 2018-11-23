import GameLogic from "../js/Logic/GameLogic.js";
import SimpleGameObject from "../js/Players/SimpleGameObject.js";
import Computer from "../js/Players/Computer.js";

describe("Test game logic", function() {
    const gameLogic = new GameLogic();

    it("Check function change player ", ()=> {
      //Если передаем Computer, то должен вернутся SimpleGameObject
      const computer = new Computer("o");

      assert.equal(gameLogic.changePlayer(new SimpleGameObject("x")), computer instanceof Computer);

      //Если передаем SimpleGameObject, то должен вернутся Computer
      const simpleGameObject = new SimpleGameObject("x");

      assert.equal(gameLogic.changePlayer(new Computer("o")), simpleGameObject instanceof SimpleGameObject);
    });

    it("Check 'x' win horizontal ", ()=> {
      assert.equal(gameLogic.checkWin([
        ["x","x","x"], 
        ["","",""],
        ["","",""]
        ], "x"), true);
      assert.equal(gameLogic.checkWin([
        ["","",""], 
        ["x","x","x"],
        ["","",""]
        ], "x"), true);
      assert.equal(gameLogic.checkWin([
        ["","",""], 
        ["","",""],
        ["x","x","x"]
        ], "x"), true);
    });

    it("Check 'x' win vertical ", ()=> {
      assert.equal(gameLogic.checkWin([
        ["x","",""], 
        ["x","",""],
        ["x","",""]
        ], "x"), true);
      assert.equal(gameLogic.checkWin([
        ["","x",""], 
        ["","x",""],
        ["","x",""]
        ], "x"), true);
      assert.equal(gameLogic.checkWin([
        ["","","x"], 
        ["","","x"],
        ["","","x"]
        ],"x"), true);
    });
  
    it("Check 'o' win horizontal", ()=> {
      assert.equal(gameLogic.checkWin([
        ["o","o","o"], 
        ["","",""],
        ["","",""]
      ], "o"), true);
      assert.equal(gameLogic.checkWin([
        ["","",""], 
        ["o","o","o"],
        ["","",""]
      ], "o"), true);
      assert.equal(gameLogic.checkWin([
        ["","",""], 
        ["","",""],
        ["o","o","o"]
      ], "o"), true);
    });

    it("Check 'x' diagonal", ()=> {
      assert.equal(gameLogic.checkWin([
        ["x","o","o"], 
        ["o","x","o"],
        ["o","o","x"]
      ], "x"), true);
      assert.equal(gameLogic.checkWin([
        ["o","o","x"], 
        ["o","x","o"],
        ["x","o","o"]
      ], "x"), true);
    });

    it("Check 'o' diagonal", function() {
      assert.equal(gameLogic.checkWin([
        ["o","x","x"], 
        ["x","o","x"],
        ["x","x","o"]
      ], "o"), true);
      assert.equal(gameLogic.checkWin([
        ["x","x","o"], 
        ["x","o","x"],
        ["o","o","x"]
      ], "o"), true);
    });

  });