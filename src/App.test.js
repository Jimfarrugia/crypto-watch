import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  findByText,
  findByTestId,
} from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

test("displays the page heading", async () => {
  await render(<App />);
  const pageHeading = findByTestId("Crypto Watch");
  expect(pageHeading).toBeInTheDocument;
});
