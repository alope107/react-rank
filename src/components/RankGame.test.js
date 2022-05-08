import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RankGame from "./RankGame";

describe("RankGame", () => {
  it("does not crash when rendered", () => {
    render(
      <MemoryRouter>
        <RankGame />
      </MemoryRouter>
    );
  });
});
