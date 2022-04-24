import { render } from "@testing-library/react";
import RankGame from "./RankGame";

describe("RankGame", () => {
  it("Does not crash when rendered", () => {
    render(<RankGame />);
  });
});
