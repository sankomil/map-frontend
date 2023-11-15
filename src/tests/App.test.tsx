/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { GlobalContext } from "../context/GlobalContext";
import { Alert, Sidebar } from "../components";
import * as helpers from "../helpers";

jest.mock("../helpers");

describe("Globalcontext test", () => {
  afterEach(cleanup);

  test("Expect error message shown when no route can be found", async () => {
    (helpers.postRoute as Function) = jest.fn(() => ({
      res: { token: "1234" },
    }));
    (helpers.getRoute as Function) = jest.fn(() => ({
      res: {
        status: "failure",
        error: "Location not accessible by car",
      },
    }));
    render(
      <GlobalContext>
        <div>
          <Sidebar />
          <Alert />
        </div>
      </GlobalContext>
    );

    await act(async () => {
      fireEvent.input(screen.getByTestId("start-point-input"), {
        target: { value: "Test" },
      });
      fireEvent.input(screen.getByTestId("end-point-input"), {
        target: { value: "Test" },
      });
      fireEvent.click(screen.getByTestId("sidebar-submit"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("alert-element")).toBeInTheDocument();
    });
  });

  test("Expect no error message when route is found successfully", async () => {
    (helpers.postRoute as Function) = jest.fn(() => ({
      res: { token: "1234" },
    }));
    (helpers.getRoute as Function) = jest.fn(() => ({
      res: {
        status: "success",
        path: [],
      },
    }));
    render(
      <GlobalContext>
        <div>
          <Sidebar />
          <Alert />
        </div>
      </GlobalContext>
    );

    await act(async () => {
      fireEvent.input(screen.getByTestId("start-point-input"), {
        target: { value: "Test" },
      });
      fireEvent.input(screen.getByTestId("end-point-input"), {
        target: { value: "Test" },
      });
      fireEvent.click(screen.getByTestId("sidebar-submit"));
    });

    await waitFor(() => {
      expect(screen.queryByTestId("alert-element")).toBeNull();
    });
  });

  test("Show error when token fails to fetch", async () => {
    (helpers.postRoute as Function) = jest.fn(() => ({
      err: { code: 500, message: "Internal server error" },
    }));
    (helpers.getRoute as Function) = jest.fn(() => ({
      res: {
        status: "success",
        path: [],
      },
    }));
    render(
      <GlobalContext>
        <div>
          <Sidebar />
          <Alert />
        </div>
      </GlobalContext>
    );

    await act(async () => {
      fireEvent.input(screen.getByTestId("start-point-input"), {
        target: { value: "Test" },
      });
      fireEvent.input(screen.getByTestId("end-point-input"), {
        target: { value: "Test" },
      });
      fireEvent.click(screen.getByTestId("sidebar-submit"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("alert-element")).toHaveTextContent(
        "Internal server error"
      );
    });
  });
});
