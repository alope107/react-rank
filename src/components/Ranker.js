import { useState } from "react";
import DataAdder from "./DataAdder";
import ItemList from "./ItemList";
import SimpleContainer from "./SimpleContainer";

function Ranker() {
  const [data, setData] = useState(["d", "a", "c", "b"]);
  const [mode, setMode] = useState("adding");

  const addItem = (title) => {
    setData([...data, title]);
  };

  const enterRankingMode = () => {
    setMode("ranking");
  };

  return (
    <div>
      {mode === "adding" && (
        <DataAdder
          handleCreate={addItem}
          handleFinish={enterRankingMode}
        ></DataAdder>
      )}
      {mode === "ranking" && (
        <SimpleContainer data={data} setData={setData}></SimpleContainer>
      )}
      <ItemList data={data}></ItemList>
    </div>
  );
}

export default Ranker;
