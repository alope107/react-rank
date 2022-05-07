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
    if (data.includes(title)) return false;

    setData([title, ...data]);
    return true;
  };

  const enterRankingMode = () => {
    setMode("ranking");
  };

  return (
    <div>
      {mode === "adding" && (
        <DataAdder
          createItem={addItem}
          handleFinish={enterRankingMode}
          finishDisabled={data.length < 2}
        ></DataAdder>
      )}
      <ItemList data={data}></ItemList>
      {mode === "ranking" && (
        <UserSort data={data} setData={setData}></UserSort>
      )}
    </div>
  );
}

export default RankGame;
