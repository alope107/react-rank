import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Comparator from "./Comparator";

describe("Comparator", () => {
  it("does not call callback on initial render", () => {
    const compare = jest.fn();
    render(<Comparator arr={[5, 6, 7]} pair={[1, 2]} compare={compare} />);

    expect(compare).not.toHaveBeenCalled();
  });

  it("renders the chosen items", () => {
    render(
      <Comparator
        arr={["riverrun", "past", "Eve", "and", "Adam's"]}
        pair={[1, 2]}
        compare={() => {}}
      />
    );

    screen.getByText("past");
    screen.getByText("Eve");
    const riverrun = screen.queryByText("riverrun");
    expect(riverrun).toBeNull();
  });

  it("sends true to the callback when the first item is chosen", async () => {
    const user = userEvent.setup();
    const compare = jest.fn();
    render(
      <Comparator
        arr={["riverrun", "past", "Eve", "and", "Adam's"]}
        pair={[1, 0]}
        compare={compare}
      />
    );

    const pastButton = screen.getByText("past");
    await user.click(pastButton);
    expect(compare).toHaveBeenCalledWith(true);
  });

  it("sends false to the callback when the second item is chosen", async () => {
    const user = userEvent.setup();
    const compare = jest.fn();
    render(
      <Comparator
        arr={["riverrun", "past", "Eve", "and", "Adam's"]}
        pair={[0, 3]}
        compare={compare}
      />
    );

    const pastButton = screen.getByText("and");
    await user.click(pastButton);
    expect(compare).toHaveBeenCalledWith(false);
  });
});
