import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataAdder from "./DataAdder";

describe("DataAdder", () => {
  let createItem, handleFinish;

  beforeEach(() => {
    createItem = jest.fn();
    handleFinish = jest.fn();
  });

  it("does not call callbacks on initial render", () => {
    render(
      <DataAdder
        createItem={createItem}
        handleFinish={handleFinish}
        finishDisabled={true}
      />
    );

    expect(createItem).not.toHaveBeenCalled();
    expect(handleFinish).not.toHaveBeenCalled();
  });

  it("renders a disabled button when finishDisabled is true", () => {
    render(
      <DataAdder
        createItem={createItem}
        handleFinish={handleFinish}
        finishDisabled={true}
      />
    );

    const butt = screen.getByText("Start Ranking!");
    expect(butt.disabled).toBe(true);
  });

  it("adds an item when a user types it in and hits enter", async () => {
    const user = userEvent.setup();

    // make it so the createItem call succeeds
    createItem.mockReturnValueOnce(true);

    render(
      <DataAdder
        createItem={createItem}
        handleFinish={handleFinish}
        finishDisabled={false}
      />
    );

    const textbox = screen.getByRole("textbox");
    await user.click(textbox);
    await user.keyboard("dummy{Enter}");

    expect(createItem).toHaveBeenCalledWith("dummy");
    expect(textbox.value).toBe("");
  });

  it("trims whitespace from an added value", async () => {
    const user = userEvent.setup();

    // make it so the createItem call succeeds
    createItem.mockReturnValueOnce(true);

    render(
      <DataAdder
        createItem={createItem}
        handleFinish={handleFinish}
        finishDisabled={false}
      />
    );

    const textbox = screen.getByRole("textbox");
    await user.click(textbox);
    await user.keyboard("  dummy {Enter}");

    expect(createItem).toHaveBeenCalledWith("dummy");
    expect(textbox.value).toBe("");
  });

  it("adds an item when a user types it in and clicks 'Add Item'", async () => {
    const user = userEvent.setup();

    // make it so the createItem call succeeds
    createItem.mockReturnValueOnce(true);

    render(
      <DataAdder
        createItem={createItem}
        handleFinish={handleFinish}
        finishDisabled={false}
      />
    );

    const textbox = screen.getByRole("textbox");
    const butt = screen.getByText("Add Item");
    await user.click(textbox);
    await user.keyboard("dummy");
    await user.click(butt);

    expect(createItem).toHaveBeenCalledWith("dummy");
    expect(textbox.value).toBe("");
  });

  it("does not attempt to add an empty item", async () => {
    const user = userEvent.setup();
    render(
      <DataAdder
        createItem={createItem}
        handleFinish={handleFinish}
        finishDisabled={false}
      />
    );

    const textbox = screen.getByRole("textbox");
    await user.click(textbox);
    await user.keyboard("{Enter}");

    expect(createItem).not.toHaveBeenCalled();
    expect(handleFinish).not.toHaveBeenCalled();
  });

  it("does not attempt to add an item that is only whitespace", async () => {
    const user = userEvent.setup();
    render(
      <DataAdder
        createItem={createItem}
        handleFinish={handleFinish}
        finishDisabled={false}
      />
    );

    const textbox = screen.getByRole("textbox");
    await user.click(textbox);
    await user.keyboard("    {Enter}");

    expect(createItem).not.toHaveBeenCalled();
    expect(handleFinish).not.toHaveBeenCalled();
  });

  it("does not clear the textbox if adding an item was unsuccessful", async () => {
    const user = userEvent.setup();

    // Make it so the createItem call fails
    createItem.mockReturnValueOnce(false);

    render(
      <DataAdder
        createItem={createItem}
        handleFinish={handleFinish}
        finishDisabled={false}
      />
    );

    const textbox = screen.getByRole("textbox");
    await user.click(textbox);
    await user.keyboard("dummy{Enter}");

    expect(createItem).toHaveBeenCalled();
    expect(handleFinish).not.toHaveBeenCalled();

    expect(textbox.value).toBe("dummy");
  });

  it("calls handleFinish when the Start Ranking button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <DataAdder
        createItem={createItem}
        handleFinish={handleFinish}
        finishDisabled={false}
      />
    );

    const butt = screen.getByText("Start Ranking!");
    await user.click(butt);

    expect(handleFinish).toHaveBeenCalled();
  });
});
