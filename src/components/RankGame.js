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

  const enterFinishedMode = () => {
    setMode("finished");
  };

  const enterAddingMode = () => {
    setData([]);
    updatePair([null, null]);
    setMode("adding");
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
      {mode === "ranking" && (
        <UserSort
          data={data}
          setData={setData}
          pair={pair}
          updatePair={updatePair}
          handleFinish={enterFinishedMode}
        ></UserSort>
      )}
      {mode === "finished" && (
        <button onClick={enterAddingMode}>Play again?</button>
      )}

      <ItemList data={data} pair={pair}></ItemList>
    </div>
  );
}

export default RankGame;
