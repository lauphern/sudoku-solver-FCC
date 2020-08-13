const textArea = document.getElementById("text-input");
import { puzzlesAndSolutions } from "./puzzle-strings.js";

class Sudoku {
  constructor() {
    this.inputArray = document.querySelectorAll("table.grid input");
  }
  paintBoard = str => {
    if (this.inputArray.length !== str.length) {
      document.querySelector("#error-msg").innerText =
        "Error: Expected puzzle to be 81 characters long.";
    } else {
      document.querySelector("#error-msg").innerText = "";
      for (let i = 0; i < str.length; i++) {
        if (!/([1-9]|\.)+/gm.test(str[i])) {
          document.querySelector("#error-msg").innerText =
            "Please enter only numbers in the range of 1-9 and dots (.)";
          break;
        }
        this.inputArray[i].value = str[i] === "." ? "" : str[i];
      }
    }
  };
}

const sudoku = new Sudoku();

document.addEventListener("DOMContentLoaded", () => {
  // Load a simple puzzle into the text area
  textArea.value =
    "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
  sudoku.paintBoard(textArea.value);
});

textArea.addEventListener("input", function () {
  console.log("changing");
  sudoku.paintBoard(this.value);
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    Sudoku,
  };
} catch (e) {}
