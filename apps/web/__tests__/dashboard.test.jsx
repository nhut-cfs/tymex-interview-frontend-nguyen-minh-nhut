import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filters from "../src/components/DashboardContent/Filters";
import { Provider } from "react-redux";
import { store } from "@/state/store";

test("check search button visible in UI", () => {
  render(
    <Provider store={store}>
      <Filters />
    </Provider>
  );

  const searchButton = screen.getByRole("button", {
    name: /Search/i,
  });
  expect(searchButton).toBeInTheDocument();

  const resetButton = screen.getByRole("button", {
    name: /Reset filter/i,
  });
  expect(resetButton).toBeInTheDocument();
});
