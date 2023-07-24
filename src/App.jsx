import React, { useState, useEffect } from "react";
import Wrapper from "./Components/Wrapper/Wrapper";
import ToggleBtn from "./Components/ToggleBtn/ToggleBtn";
import Display from "./Components/Display/Display";
import Keypad from "./Components/Keypad/Keypad";
import Button from "./Components/Button/Button";

// ###################
// Button values array
// ###################

const btnValues = [
  7,
  8,
  9,
  "DEL",
  4,
  5,
  6,
  "+",
  1,
  2,
  3,
  "-",
  ".",
  0,
  "/",
  "x",
  "RESET",
  "=",
];
// ###############################################################################
// Function to convert numbers into a localized string with a thousands separators
// ###############################################################################

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

// ##################################################
// Function to remove whitespace from a number string
// ##################################################

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

// ##############
// Main component
// ##############

function App() {
  // ############################################################
  // Hooks to manage the current toggle state and calculator data
  // ############################################################

  const [toggleState, setToggleState] = useState("one");
  const [calc, setCalc] = useState({ operator: "", num: 0, res: 0 });

  // ###############################################################################
  // Function to get the ID of the wrapper element based on the current toggle state
  // ###############################################################################

  function getWrapperId() {
    switch (toggleState) {
      case "one":
        return "one";
      case "two":
        return "two";
      default:
        return "three";
    }
  }

  // ##############################################
  // Function to handle changes in the toggle state
  // ##############################################

  function handleToggleStateChange(value) {
    setToggleState(value);
  }
  // ####################################################
  // A function to handle button clicks on the calculator
  // ####################################################

  function handleButtonClick(value) {
    switch (value) {
      case "RESET":
        resetCalculator();
        break;
      case "=":
        calculateResult();
        break;
      case "DEL":
        deleteLastChar();
        break;
      case ".":
        addDecimal();
        break;
      case "+":
      case "-":
      case "/":
      case "x":
        setOperator(value);
        break;
      default:
        addDigit(value);
        break;
    }
  }

  // #######################################################
  // A function to reset the calculator to its initial state
  // #######################################################

  function resetCalculator() {
    setCalc({ operator: "", num: 0, res: 0 });
  }
  // ##############################################################################
  // A function to calculate the result of the expression entered in the calculator
  // ##############################################################################

  function calculateResult() {
    if (calc.operator && calc.num) {
      // Help function to perform basic mathematical operations
      const math = (a, b, operator) =>
        operator === "+"
          ? a + b
          : operator === "-"
          ? a - b
          : operator === "x"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.operator === "/"
            ? "n00b"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.operator
                )
              ),
        operator: "",
        num: 0,
      });
    }
  }

  // Function to delete the last character from the current number
  function deleteLastChar() {
    setCalc({ ...calc, num: calc.num.toString().slice(0, -1) });
  }

  // Function to add a decimal point to the current number
  function addDecimal() {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + "." : calc.num,
    });
  }

  // Function to set the operator for the current expression
  function setOperator(value) {
    setCalc({
      ...calc,
      operator: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  }

  // Function to add a digit to the current number
  function addDigit(value) {
    if (removeSpaces(calc.num).length < 10) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.operator ? 0 : calc.res,
      });
    }
  }
  // #######################################################################
  // useEffect hook to change the background color based on the toggle state
  // #######################################################################

  useEffect(() => {
    document.body.style.backgroundColor =
      backgroundColors[toggleState] || "hsl(222, 26%, 31%)"; // Theme 1
  }, [toggleState]);

  // Object to map toggle states to background colors
  const backgroundColors = {
    two: "hsl(0, 0%, 90%", // Theme 2
    three: "hsl(268, 75%, 9%)", // Theme 3
  };

  // ########################################

  return (
    <Wrapper id={getWrapperId()}>
      {/* Header */}
      <div className="headerContainer">
        <div>
          <p>calc</p>
        </div>
        <div>
          <div className="toggleWrapper">
            <div>
              <p>THEME</p>
            </div>
            <div>
              <div className="themeNumbers">
                <p>1</p>
                <p>2</p>
                <p>3</p>
              </div>
              <ToggleBtn
                onToggle={handleToggleStateChange}
                value={toggleState}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Display */}
      <Display value={calc.num ? calc.num : calc.res} />
      {/* Keypad */}
      <Keypad>
        {btnValues.map((btn, i) => (
          <Button
            key={i}
            className={
              btn === "="
                ? "equals"
                : btn === "RESET"
                ? "reset"
                : btn === "DEL"
                ? "del"
                : ""
            }
            value={btn}
            onClick={() => handleButtonClick(btn)}
          />
        ))}
      </Keypad>
    </Wrapper>
  );
}

export default App;
