import { useEffect, useState } from "react";
import SimpleButton from "./SimpleButton";

function* gen(arr, updateArr, updatePair) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      console.log(`checkin' ${[j, j - 1]}`);
      updatePair([arr[j], arr[j - 1]]);
      const shouldSwap = yield;
      if (shouldSwap) {
        console.log(`swappin' ${[j, j - 1]}`);
        arr = [...arr];
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        updateArr(arr);
      } else {
        break;
      }
    }
  }
  console.log("All done!");
}

function SimpleContainer() {
  const [data, updateData] = useState([3, 5, 1, 77, 4, 2]);
  const [pair, updatePair] = useState([55, 55]);
  const [stepper] = useState(gen(data, updateData, updatePair));

  useEffect(() => {
    stepper.next();
  }, []);

  const unpause = (n) => stepper.next(n);

  return (
    <div>
      {data.toString()}
      <SimpleButton unpause={unpause} pair={pair}></SimpleButton>
    </div>
  );
}

export default SimpleContainer;
