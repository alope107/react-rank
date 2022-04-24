import { useEffect, useState } from "react";
import Comparator from "./Comparator";

import insertionSort from "../sorts/insertionSort";

/**
 *
 * @param {Object} props
 * @param {Array} props.data
 * @param {function(Array)} props.setData
 * @returns
 */
function UserSort({ data, setData }) {
  const [pair, updatePair] = useState([null, null]);
  const [stepper] = useState(insertionSort(data, setData, updatePair));
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Update the stepper only once - gets us to the first yield
    // That way, any successive steps can successfully pass values
    // through the yields.
    stepper.next();
  }, [stepper]);

  /**
   * Sends the result of a comparison to the stepper.
   * Sets the finished state to true once the stepper is
   * exhausted (sorting is done).
   *
   * @param {Boolean} shouldSwap Whether the stepper should make the swap.
   */
  const compare = (shouldSwap) => {
    if (stepper.next(shouldSwap).done) {
      setFinished(true);
    }
  };

  return (
    <div>
      {!finished && <Comparator compare={compare} pair={pair}></Comparator>}
    </div>
  );
}

export default UserSort;
