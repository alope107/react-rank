import { useState } from "react";
import Comparer from "./Comparer";
import DataAdder from "./DataAdder";
import ItemList from "./ItemList";

function* sortDelayed(len, sortState, setToCheck, executeSwap) {
  console.log("startin'");
  for (let i = 0; i < len; i++) {
    for (let j = i; j > 0; j--) {
      console.log(`checkin' ${[j, j - 1]}`);
      setToCheck(j, j - 1);
      yield;
      if (sortState.shouldSwap) {
        console.log(`swappin' ${[j, j - 1]}`);
        executeSwap(j, j - 1);
      } else {
        break;
      }
    }
  }
}

function Ranker() {
  const [data, setData] = useState(["d", "a", "c", "b"]);
  const [mode, setMode] = useState("adding");

  const [sortStepper, setSortStepper] = useState(null);
  const [sortState, setSortState] = useState({
    toCheck: [0, 0],
    shouldSwap: false,
    checkCount: 0,
    continueSort: true,
  });

  const setToCheck = (a, b) => {
    console.log(`setToCheck ${[a, b]}`);
    const newSortState = { ...sortState };
    newSortState.toCheck = [data[a], data[b]];
    newSortState.continueSort = false;
    setSortState(newSortState);
  };

  const setShouldSwap = (shouldSwap) => {
    console.log("setShouldSwap");
    const newSortState = { ...sortState };
    newSortState.shouldSwap = shouldSwap;
    newSortState.checkCount += 1;
    newSortState.continueSort = true;
    sortStepper.next();
    setSortState(newSortState);
  };

  const addItem = (title) => {
    setData([...data, title]);
  };

  const executeSwap = (i, j) => {
    const newSortState = { ...sortState };
    newSortState.continueSort = false;
    setSortState(newSortState);

    const newData = [...data];
    [newData[i], newData[j]] = [newData[j], newData[i]];
    setData(newData);
  };

  const enterRankingMode = () => {
    setMode("ranking");

    const sortStepper = sortDelayed(
      data.length,
      sortState,
      setToCheck,
      executeSwap
    );
    setSortStepper(sortStepper);
  };

  // console.log(`Continue sorting? ${sortState.continueSort}`);

  // if (mode === "ranking" && sortState.continueSort) {
  //   console.log("nextin'");
  //   console.log(sortStepper.next());
  // }

  return (
    <div>
      {sortState.checkCount}
      {mode === "adding" && (
        <DataAdder
          handleCreate={addItem}
          handleFinish={enterRankingMode}
        ></DataAdder>
      )}
      {mode === "ranking" && (
        <Comparer
          items={sortState.toCheck}
          setShouldSwap={setShouldSwap}
        ></Comparer>
      )}
      <ItemList data={data}></ItemList>
    </div>
  );
}

export default Ranker;
