const textArea = document.getElementById('text-input');
import { puzzlesAndSolutions } from './puzzle-strings.js';

document.addEventListener('DOMContentLoaded', () => {
  // Load a simple puzzle into the text area
  textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  let sudoku = new Sudoku();
  sudoku.paintBoard(textArea.value)
});

class Sudoku {
  constructor() {
    this.inputArray = document.querySelectorAll("table.grid input")
  }
  paintBoard = (str) => {
    if(this.inputArray.length !== str.length) alert("Please enter a string in the text area that covers every cells of the Sudoku grid")
    for(let i = 0; i < str.length; i++) {
      this.inputArray[i].value = str[i] === "." ? "" : str[i];
    }
  }
}

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    Sudoku
  }
} catch (e) {}
