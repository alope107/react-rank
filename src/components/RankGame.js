import { useState } from "react";
import DataAdder from "./DataAdder";
import ItemList from "./ItemList";
import UserSort from "./UserSort";

function RankGame() {
  const [data, setData] = useState([]);

  // Mode is either "adding" (adding new items to list)
  // or "ranking" (sorting the list)
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
        <UserSort data={data} setData={setData}></UserSort>
      )}

      <ItemList data={data}></ItemList>
    </div>
  );
}

export default RankGame;
