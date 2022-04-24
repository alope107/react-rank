import { useState } from "react";
import SimpleButton from "./SimpleButton";

function* gen(updateVal) {
  let val = 1;
  while (true) {
    updateVal(val);
    yield;
    val *= 2;
  }
}

function SimpleContainer() {
  console.log("heyooo");
  const [numba, updateNumba] = useState(9);
  const [stepper] = useState(gen(updateNumba));

  const unpause = () => stepper.next();

  return (
    <div>
      {numba}
      <SimpleButton unpause={unpause}></SimpleButton>
    </div>
  );
}

export default SimpleContainer;
