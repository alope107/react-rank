import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
  it("does not crash when rendered", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
