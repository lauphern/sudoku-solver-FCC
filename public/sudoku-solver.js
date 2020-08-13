import { puzzlesAndSolutions } from "./puzzle-strings.js";

export class Sudoku {
  constructor() {
    this.gridObject = {};
    this.inputArray = document.querySelectorAll("table.grid input");
    this.textArea = document.getElementById("text-input");
    this.index = Math.floor(Math.random() * puzzlesAndSolutions.length);
    this.string = puzzlesAndSolutions[this.index][0];
    this.solution = puzzlesAndSolutions[this.index][1];
    this.addListeners()
    this.gridObjectInit()
  }

  paintBoard = str => {
    if (this.inputArray.length !== str.length) {
      document.querySelector("#error-msg").innerText =
        "Error: Expected puzzle to be 81 characters long.";
    } else {
      document.querySelector("#error-msg").innerText = "";
      for (let i = 0; i < str.length; i++) {
        if (!this.testValidInput(str[i])) {
          document.querySelector("#error-msg").innerText =
            "Please enter only numbers in the range of 1-9 and dots (.)";
          return;
        }
        this.inputArray[i].value = str[i] === "." ? "" : str[i];
      }
      this.string = str;
      this.updateGridObject(this.string);
    }
  };

  updateTextArea = inputFieldValue => {
    if(inputFieldValue && !this.testValidInput(inputFieldValue)) {
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
      this.updateGridObject(this.string);
    }
  }

  clear = () => {
    this.textArea.value = "";
    this.inputArray.forEach(input => input.value = "")
    document.querySelector("#error-msg").innerText = "";
    this.string = "";
    this.solution = "";
  }

  clickSolve = () => {
    //Update grid
    this.paintBoard(this.solution);
    //Update text area
    this.updateTextArea();
  }

  checkSolution = () => {
    if(this.solution === this.string) alert("Congrats! You solved the sudoku!")
  }

  testValidInput = value => {
    if(value.length > 1) return false;
    else return /([1-9]|\.|^$)+/gm.test(value);
  }

  gridObjectInit = () => {
    // A = String.fromCharCode(65)
    let newRow = {};
    for(let charCode = 65; charCode <= 73; charCode++) {
      for(let i = 1; i <= 9; i++) {
        newRow[`${String.fromCharCode(charCode)}${i}`] = "";
        if(i === 9) {
          this.gridObject[String.fromCharCode(charCode)] = newRow;
          newRow = {};
        }
      }
    }
  }

  updateGridObject = (str) => {
    let index = 0;
    for(let row in this.gridObject) {
      for(let cell in this.gridObject[row]) {
        this.gridObject[row][cell] = str[index];
        index++;
      }
    }
    return this.gridObject;
  }

  addListeners = () => {
    //On the document, when the DOM is loaded
    document.addEventListener("DOMContentLoaded", () => {
      // Load a simple puzzle into the text area
      this.textArea.value = this.string;
      this.paintBoard(this.textArea.value);
    });

    //On the text area
    this.textArea.addEventListener("input", e => {
      this.paintBoard(e.target.value);
      this.checkSolution();
    });

    //On the input fields from the board
    this.inputArray.forEach(input => {
      input.addEventListener("input", e => {
        this.updateTextArea(e.target.value);
        this.checkSolution();
      })
    })

    //Clear button
    document.querySelector("#clear-button").addEventListener("click", () => {
      this.clear()
    })

    //Solve button
    document.querySelector("#solve-button").addEventListener("click", () => {
      this.clickSolve()
    })
  }
}

const sudoku = new Sudoku();

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
// try {
//   // module.exports = {
//   //   Solver: Sudoku,
//   // };
//   export default Sudoku;
// } catch (e) {
//   console.error(e);
// }
