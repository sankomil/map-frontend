import React from "react";
import { Sidebar } from "../components";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const getPathToken = jest.fn();

jest.mock("../hooks", () => {
  return {
    useGetRoute: jest.fn(() => ({
      getPathToken,
      loading: false,
      resetAll: jest.fn(),
    })),
    useGlobalContext: jest.fn(() => ({ error: null })),
  };
});

describe("Sidebar test", () => {
  test("Component renders", () => {
    const { container } = render(<Sidebar />);
    expect(container).toMatchSnapshot();
  });

  test("Submit function is called when user submits", () => {
    render(<Sidebar />);
    fireEvent.input(screen.getByTestId("start-point-input"), {
      target: { value: "Test" },
    });
    fireEvent.input(screen.getByTestId("end-point-input"), {
      target: { value: "Test" },
    });
    fireEvent.click(screen.getByTestId("sidebar-submit"));
    expect(getPathToken).toHaveBeenCalled();
  });

  test("User can write in inputs", () => {
    render(<Sidebar />);
    fireEvent.input(screen.getByTestId("start-point-input"), {
      target: { value: "Test" },
    });
    fireEvent.input(screen.getByTestId("end-point-input"), {
      target: { value: "Test" },
    });
    expect(screen.getByTestId("start-point-input")).toHaveValue("Test");
    expect(screen.getByTestId("end-point-input")).toHaveValue("Test");
  });

  test("Users can clear text", () => {
    render(<Sidebar />);
    fireEvent.input(screen.getByTestId("start-point-input"), {
      target: { value: "Test" },
    });
    fireEvent.click(screen.getByTestId("start-point-clear"));
    expect(screen.getByTestId("start-point-input")).toHaveValue("");
  });

  test("Submit button is disabled when no origin and destination is given", () => {
    render(<Sidebar />);

    expect(screen.getByTestId("sidebar-submit")).toHaveAttribute("disabled");
  });
});
