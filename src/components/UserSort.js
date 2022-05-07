import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Comparator from "./Comparator";

import insertionSort from "../sorts/insertionSort";

/**
 *
 * @param {Object} props
 * @param {Array} props.data
 * @param {function(Array)} props.setData
 * @param {function(Array, function, function)} props.sortFactory
 * @returns
 */
function UserSort({
  data,
  setData,
  pair,
  updatePair,
  handleFinish,
  sortFactory = insertionSort,
}) {
  const [stepper] = useState(sortFactory(data, setData, updatePair));

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
      updatePair([null, null]);
      handleFinish();
    }
  };

  return (
    <div>
      <Comparator compare={compare} arr={data} pair={pair}></Comparator>
    </div>
  );
}

UserSort.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  pair: PropTypes.array.isRequired,
  updatePair: PropTypes.func.isRequired,
  handleFinish: PropTypes.func.isRequired,
  sortFactory: PropTypes.func,
};

export default UserSort;
