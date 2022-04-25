import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("does not crash when rendered", () => {
    render(<App />);
  });
});
