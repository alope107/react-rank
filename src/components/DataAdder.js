import { useState } from "react";

function DataAdder({ createItem, handleFinish }) {
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
      <button onClick={handleSubmit}>Create</button>
      <button onClick={handleFinish}>Done</button>
    </div>
  );
}

export default DataAdder;
