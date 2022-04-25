import PropTypes from "prop-types";
import { useState } from "react";

/**
 *
 * @param {Object} props
 * @param {function(string)} props.createItem
 * @param {function()} props.handleFinish
 * @param {boolean} finishDisabled
 * @returns
 */
function DataAdder({ createItem, handleFinish, finishDisabled }) {
  const [value, setValue] = useState("");

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (value === "") {
      handleInvalid();
      return;
    }
    const success = createItem(value);
    if (!success) {
      handleInvalid();
      return;
    }
    setValue("");
  };

  const handleInvalid = () => {
    console.log("Can't enter that!");
    // TODO: animate instead of logging error
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      ></input>
      <button onClick={handleSubmit}>Add Item</button>
      <button onClick={handleFinish} disabled={finishDisabled}>
        Start Ranking!
      </button>
    </div>
  );
}

DataAdder.propTypes = {
  createItem: PropTypes.func.isRequired,
  handleFinish: PropTypes.func.isRequired,
  finishDisabled: PropTypes.bool.isRequired,
};

export default DataAdder;
