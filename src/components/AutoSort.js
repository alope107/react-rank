import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import insertionSort from "../sorts/insertionSort";

function AutoSort({
  data,
  setData,
  updatePair,
  choices,
  handleFinish,
  sortFactory = insertionSort,
  delay = 1000,
}) {
  const [stepper] = useState(sortFactory(data, setData, updatePair));

  useEffect(() => {
    // Update the stepper only once - gets us to the first yield
    // That way, any successive steps can successfully pass values
    // through the yields.
    stepper.next();
    const showChoice = (idx) => {
      return () => {
        if (idx < choices.length) {
          stepper.next(choices[idx]);
          setTimeout(showChoice(idx + 1), delay);
        } else {
          handleFinish();
        }
      };
    };
    setTimeout(showChoice(0), delay);
    // TODO(auberon): Try to better understand the missing dependencies warning
  }, [stepper]);
}

AutoSort.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  updatePair: PropTypes.func.isRequired,
  choices: PropTypes.array.isRequired,
  handleFinish: PropTypes.func.isRequired,
  sortFactory: PropTypes.func,
  delay: PropTypes.number,
};

export default AutoSort;
