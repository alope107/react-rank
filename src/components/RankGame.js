import { useState } from "react";
import DataAdder from "./DataAdder";
import ItemList from "./ItemList";
import UserSort from "./UserSort";

function RankGame() {
  // The overall array of items being ranked
  const [data, setData] = useState([]);
  // The two items currently being compared.
  const [pair, updatePair] = useState([null, null]);
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
      <ItemList data={data} pair={pair}></ItemList>
      {mode === "ranking" && (
        <UserSort
          data={data}
          setData={setData}
          pair={pair}
          updatePair={updatePair}
        ></UserSort>
      )}
    </div>
  );
}

export default RankGame;
