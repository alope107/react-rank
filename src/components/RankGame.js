import { useEffect, useState } from "react";
import AutoSort from "./AutoSort";
import DataAdder from "./DataAdder";
import ItemList from "./ItemList";
import UserSort from "./UserSort";
import { useSearchParams } from "react-router-dom";

function RankGame() {
  // The overall array of items being ranked
  const [data, setData] = useState([]);
  // The initial ordering of the data
  const [original, setOriginal] = useState([]);
  // The two items currently being compared.
  const [pair, updatePair] = useState([null, null]);
  // A log of all the choices a user made when sorting
  const [choices, setChoices] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  // Experimental: try to get a preset list of items from the query params
  const queryItems = searchParams.get("items");
  let validItems = false;
  let parsedItems;
  if (queryItems != null) {
    try {
      parsedItems = JSON.parse(queryItems);
      if (Array.isArray(parsedItems)) {
        validItems = true;
      }
    } catch (err) {
      // TODO: Show error message to user?
      console.log(err);
    }
  }

  // If there is usable data from the query params, use it to
  // set the state and begin ranking.
  useEffect(() => {
    if (validItems) {
      setData([...parsedItems]);
      setOriginal([...parsedItems]);
      setMode("ranking");
      setSearchParams({});
    }
    // TODO: Continue to explore dependency array warning.
  }, []);

  // Mode is one of:
  // "adding" (adding new items to list)
  // "ranking" (sorting the list)
  // "finished" (after soring is complete)
  // "replay" (watching the choices back)
  const [mode, setMode] = useState("adding");

  const addItem = (title) => {
    if (data.includes(title)) return false;

    setData([title, ...data]);
    return true;
  };

  const enterRankingMode = () => {
    setOriginal([...data]);
    setMode("ranking");
  };

  const enterFinishedMode = () => {
    updatePair([null, null]);
    setMode("finished");
  };

  const enterReplayMode = () => {
    setData([...original]);
    setMode("replay");
  };

  const enterAddingMode = () => {
    setData([]);
    setChoices([]);
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
          choices={choices}
          setChoices={setChoices}
          handleFinish={enterFinishedMode}
        ></UserSort>
      )}
      {mode === "finished" && (
        <div>
          <button onClick={enterReplayMode}>Watch Replay?</button>
          <button onClick={enterAddingMode}>Play again?</button>
        </div>
      )}
      {mode === "replay" && (
        <AutoSort
          data={data}
          setData={setData}
          updatePair={updatePair}
          choices={choices}
          handleFinish={enterFinishedMode}
        />
      )}

      <ItemList data={data} pair={pair}></ItemList>
    </div>
  );
}

export default RankGame;
