/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require('../public/sudoku-solver.js');
  });
  
  suite('Text area and sudoku grid update automatically', () => {
    // Entering a valid number in the text area populates 
    // the correct cell in the sudoku grid with that number
    test('Valid number in text area populates correct cell in grid', done => {
      let input = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      let solver = new Solver.Sudoku();
      solver.paintBoard(input);
      let newInput = "3" + input.slice(1);
      solver.paintBoard(newInput);
      assert.equal(document.querySelector("input#A1").value, newInput[0]);
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test('Valid number in grid updates the puzzle string in the text area', done => {
      let input = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      let solver = new Solver.Sudoku();
      solver.updateTextArea(input);
      let newInput = "3" + input.slice(1);
      solver.updateTextArea(newInput[0]);
      assert.equal(document.querySelector("textarea").value, newInput);
      done();
    });
  });
  
  suite('Clear and solve buttons', () => {
    // Pressing the "Clear" button clears the sudoku 
    // grid and the text area
    test('Function clearInput()', done => {
      let solver = new Solver.Sudoku();
      solver.clear()
      assert.equal(document.querySelector("textarea").value, "");
      assert.equal(document.querySelector("input#A1").value, "");
      assert.equal(document.querySelector("input#C7").value, "");
      assert.equal(document.querySelector("input#I9").value, "");
      done();
    });
    
    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test('Function showSolution(solve(input))', done => {
      let solver = new Solver.Sudoku();
      solver.clickSolve()
      assert.equal(document.querySelector("textarea").value, solver.solution);
      assert.equal(document.querySelector("input#A1").value, solver.solution[0]);
      assert.equal(document.querySelector("input#C7").value, solver.solution[24]);
      assert.equal(document.querySelector("input#I9").value, solver.solution[80]);
      done();
    });
  });
});

