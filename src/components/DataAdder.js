import { useState } from "react";

function DataAdder({ createItem, handleFinish }) {
  const [value, setValue] = useState("");

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (value !== "") {
      createItem(value);
      setValue("");
    }
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
