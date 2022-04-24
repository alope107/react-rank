import { useEffect, useState } from "react";
import Comparator from "./Comparator";

/**
 * Does a bubble sort bit by bit. It non-blockingly delegates
 * comparisons to some outside comparator. It uses updatePair
 * to denote the two items it wants compared. The outside
 * comparator should then call next on the iterator and pass
 * true if the first item in the pair should be before the second,
 * false otherwise.
 *
 * @param {Array} arr The initial data array
 * @param {function(Array)} updateArr The state updater for arr
 * @param {function(Array)} updatePair The state updater for the pair to check
 */
function* nonBlockSort(arr, updateArr, updatePair) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      // Selects pair for comparison and waits for result
      updatePair([arr[j], arr[j - 1]]);
      const shouldSwap = yield;

      if (shouldSwap) {
        arr = [...arr];
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        updateArr(arr);
      } else {
        break;
      }
    }
  }
}

function UserSort({ data, setData }) {
  const [pair, updatePair] = useState([55, 55]);
  const [stepper] = useState(nonBlockSort(data, setData, updatePair));
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Update the stepper only once - gets us to the first yield
    // That way, any successive steps can successfully pass values
    // through the yields.
    stepper.next();
  }, [stepper]);

  const unpause = (n) => {
    if (stepper.next(n).done) {
      setFinished(true);
    }
  };

  return (
    <div>
      {!finished && <Comparator unpause={unpause} pair={pair}></Comparator>}
    </div>
  );
}

export default UserSort;
