import GameLogic from "../js/GameLogic.js";

describe("Win check", function() {
    const gameLogic = new GameLogic();
    it("Check 'x' win horizontal ", ()=> {
      assert.equal(gameLogic.checkWin([
        ["x","x","x"], 
        ["","",""],
        ["","",""]
        ]), true);
      assert.equal(gameLogic.checkWin([
        ["","",""], 
        ["x","x","x"],
        ["","",""]
        ]), true);
      assert.equal(gameLogic.checkWin([
        ["","",""], 
        ["","",""],
        ["x","x","x"]
        ]), true);
    });

    it("Check 'x' win vertical ", ()=> {
      assert.equal(gameLogic.checkWin([
        ["x","",""], 
        ["x","",""],
        ["x","",""]
        ]), true);
      assert.equal(gameLogic.checkWin([
        ["","x",""], 
        ["","x",""],
        ["","x",""]
        ]), true);
      assert.equal(gameLogic.checkWin([
        ["","","x"], 
        ["","","x"],
        ["","","x"]
        ]), true);
    });
  
    it("Check 'o' win horizontal", ()=> {
      assert.equal(gameLogic.checkWin([
        ["o","o","o"], 
        ["","",""],
        ["","",""]
      ]), true);
      assert.equal(gameLogic.checkWin([
        ["","",""], 
        ["o","o","o"],
        ["","",""]
      ]), true);
      assert.equal(gameLogic.checkWin([
        ["","",""], 
        ["","",""],
        ["o","o","o"]
      ]), true);
    });

    it("Check 'x' diagonal", ()=> {
      assert.equal(gameLogic.checkWin([
        ["x","o","o"], 
        ["o","x","o"],
        ["o","o","x"]
      ]), true);
      assert.equal(gameLogic.checkWin([
        ["o","o","x"], 
        ["o","x","o"],
        ["x","o","o"]
      ]), true);
    });

    it("Check 'o' diagonal", function() {
      assert.equal(gameLogic.checkWin([
        ["o","x","x"], 
        ["x","o","x"],
        ["x","x","o"]
      ]), true);
      assert.equal(gameLogic.checkWin([
        ["x","x","o"], 
        ["x","o","x"],
        ["o","o","x"]
      ]), true);
    });

  });