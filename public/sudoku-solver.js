import { puzzlesAndSolutions } from "./puzzle-strings.js";

export class Sudoku {
  constructor() {
    this.gridObject = this.gridObjectInit();
    this.inputArray = document.querySelectorAll("table.grid input");
    this.textArea = document.getElementById("text-input");
    this.index = Math.floor(Math.random() * puzzlesAndSolutions.length);
    this.string = puzzlesAndSolutions[this.index][0];
    this.solution = puzzlesAndSolutions[this.index][1];
    this.addListeners()
  }

  paintBoard = str => {
    if (this.inputArray.length !== str.length) {
      document.querySelector("#error-msg").innerText =
        "Error: Expected puzzle to be 81 characters long.";
      this.string = str;
    } else {
      document.querySelector("#error-msg").innerText = "";
      this.string = str;
      this.gridObject = this.updateGridObject(this.string);
      for (let i = 0; i < str.length; i++) {
        if (!this.testValidInput(str[i])) {
          document.querySelector("#error-msg").innerText =
            "Please enter only numbers in the range of 1-9 and dots (.)";
          return;
        }
        this.inputArray[i].value = str[i] === "." ? "" : str[i];
      }
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
      this.gridObject = this.updateGridObject(this.string);
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
    //If the string only contains numbers (i.e. is completed), check if it's valid
    if(this.string.length !== 81) return;
    if(/^[1-9]+$/gm.test(this.string) && !this.validateSolutionString(this.string)) alert("There are some mistakes!")
    if(this.solution === this.string) alert("Congrats! You solved the sudoku!")
  }

  testValidInput = value => {
    if(value.length > 1) return false;
    else return /([1-9]|\.|^$)+/gm.test(value);
  }

  gridObjectInit = () => {
    // A = String.fromCharCode(65)
    let newRow = {};
    let gridObject = {};
    for(let charCode = 65; charCode <= 73; charCode++) {
      for(let i = 1; i <= 9; i++) {
        newRow[`${String.fromCharCode(charCode)}${i}`] = "";
        if(i === 9) {
          gridObject[String.fromCharCode(charCode)] = newRow;
          newRow = {};
        }
      }
    }
    return gridObject;
  }

  updateGridObject = str => {
    let index = 0;
    let gridObject = this.gridObjectInit();
    for(let row in gridObject) {
      for(let cell in gridObject[row]) {
        gridObject[row][cell] = str[index];
        index++;
      }
    }
    return gridObject;
  }

  validateSolutionString = str => {
    let gridObject = this.updateGridObject(str);
    let rowCount = {};
    for(let charCode = 65; charCode <= 73; charCode ++) {
      let newRow = {};
      for(let i = 1; i <= 9; i ++) {
        newRow[i] = 0;
      }
      rowCount[String.fromCharCode(charCode)] = newRow;
    }
    for(let row in gridObject) {
      for(let cell in gridObject[row]) {
        let val = gridObject[row][cell];
        rowCount[row][val]++; 
      }
    }
    let valuesArray = [];
    for(let row in rowCount) {
      for(let cell in rowCount[row]) {
        let val = rowCount[row][cell];
        valuesArray.push(val);
      }
    }
    return valuesArray.every(val => val === 1);
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
