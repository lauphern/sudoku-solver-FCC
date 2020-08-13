import { puzzlesAndSolutions } from "./puzzle-strings.js";

class Sudoku {
  constructor() {
    this.inputArray = document.querySelectorAll("table.grid input");
    this.textArea = document.getElementById("text-input");
    this.string = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    this.addListeners()
  }

  paintBoard = str => {
    if (this.inputArray.length !== str.length) {
      document.querySelector("#error-msg").innerText =
        "Error: Expected puzzle to be 81 characters long.";
    } else {
      this.string = str;
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

  updateTextArea = inputField => {
    if(!/([1-9]|\.|^$)+/gm.test(inputField.value)) {
      document.querySelector("#error-msg").innerText = "Please enter only numbers in the range of 1-9 and dots (.)";
      return
    } else {
      document.querySelector("#error-msg").innerText = "";
      let newStr = "";
      this.inputArray.forEach(input => {
        if(input.value === "") newStr += "."
        else newStr += input.value
      })
      this.string = newStr;
      this.textArea.value = newStr;
    }
  }

  clear = () => {
    this.textArea.value = "";
    this.inputArray.forEach(input => input.value = "")
    document.querySelector("#error-msg").innerText = "";
  }

  addListeners = () => {
    //On the document, when the DOM is loaded
    document.addEventListener("DOMContentLoaded", () => {
      // Load a simple puzzle into the text area
      this.textArea.value = this.string;
      sudoku.paintBoard(this.textArea.value);
    });
    //On the text area
    this.textArea.addEventListener("input", function () {
      sudoku.paintBoard(this.value);
    });

    //On the input fields from the board
    this.inputArray.forEach(input => {
      input.addEventListener("input", e => {
        this.updateTextArea(e.target);
      })
    })

    //Clear button
    document.querySelector("#clear-button").addEventListener("click", () => {
      this.clear()
    })
  }
}

const sudoku = new Sudoku();

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
