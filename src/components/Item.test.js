import { render, screen } from "@testing-library/react";
import Item from "./Item";

describe("Item", () => {
  it("renders the content", () => {
    render(<Item content={"sup"} selected={false} />);

    screen.getByText("sup");
  });
});
