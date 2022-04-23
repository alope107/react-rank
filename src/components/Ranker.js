import { useState } from "react";
import Comparer from "./Comparer";
import DataAdder from "./DataAdder";
import ItemList from "./ItemList";

function Ranker() {
  const [data, setData] = useState([]);
  const addItem = (title) => {
    setData([...data, title]);
  };

  const selectItem = (item) => {
    console.log(`You selected ${item}`);
  };

  const [mode, setMode] = useState("adding");

  const enterRankingMode = () => setMode("ranking");

  return (
    <div>
      {mode === "adding" && (
        <DataAdder
          handleCreate={addItem}
          handleFinish={enterRankingMode}
        ></DataAdder>
      )}
      {mode === "ranking" && (
        <Comparer
          items={[data[0], data[1]]}
          handleSelect={selectItem}
        ></Comparer>
      )}
      <ItemList data={data}></ItemList>
    </div>
  );
}

export default Ranker;
