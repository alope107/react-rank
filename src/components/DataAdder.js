import PropTypes from "prop-types";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 *
 * @param {Object} props
 * @param {function(string)} props.createItem
 * @param {function()} props.handleFinish
 * @param {boolean} props.finishDisabled
 * @returns
 */
function DataAdder({ createItem, handleFinish, finishDisabled }) {
  const [value, setValue] = useState("");
  const controls = useAnimation();

  // Submit on enter
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  // Only submit if the input is non-empty and not already in the list
  const handleSubmit = () => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      handleInvalid();
      return;
    }
    const success = createItem(trimmedValue);
    if (!success) {
      handleInvalid();
      return;
    }

    // Clear textbox so it can accept new input
    setValue("");
  };

  // Shake angrily if the user tries to put in invalid data
  const handleInvalid = () => {
    controls.start({
      x: [0, -20, 20, 0],
      transition: { duration: 0.1, repeat: 3 },
    });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <motion.div animate={controls}>
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
    </motion.div>
  );
}

DataAdder.propTypes = {
  createItem: PropTypes.func.isRequired,
  handleFinish: PropTypes.func.isRequired,
  finishDisabled: PropTypes.bool.isRequired,
};

export default DataAdder;
