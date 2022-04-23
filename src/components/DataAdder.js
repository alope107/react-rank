import { useState } from "react";

function DataAdder({ handleCreate, handleFinish }) {
  const [value, updateValue] = useState("bigData");

  const handleChange = (event) => {
    updateValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange}></input>
      <button onClick={() => handleCreate(value)}>Create</button>
      <button onClick={handleFinish}>Done</button>
    </div>
  );
}

export default DataAdder;
