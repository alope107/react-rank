import { render } from "@testing-library/react";
import App from "./App";

test("app does not crash when rendered", () => {
  render(<App />);
});
