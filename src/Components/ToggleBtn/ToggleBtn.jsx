import React from "react";
import "./ToggleBtn.css";

export default function ToggleBtn({ onToggle, value }) {
  function handleToggle(newValue) {
    onToggle(newValue);
  }

  return (
    <div className="toggleBtn">
      <input
        id="toggleOne"
        type="radio"
        value="one"
        checked={value === "one"}
        onChange={() => handleToggle("one")}
      />

      <input
        id="toggleTwo"
        type="radio"
        value="two"
        checked={value === "two"}
        onChange={() => handleToggle("two")}
      />

      <input
        id="toggleThree"
        type="radio"
        value="three"
        checked={value === "three"}
        onChange={() => handleToggle("three")}
      />
    </div>
  );
}
