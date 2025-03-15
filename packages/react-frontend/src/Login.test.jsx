/* eslint-env jest */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login.jsx";

test("renders login form and allows user to submit credentials", () => {
  const mockHandleSubmit = jest.fn();
  const token = "TOKEN";

  render(
    <MemoryRouter>
      <Login token={token} handleSubmit={mockHandleSubmit} />
    </MemoryRouter>,
  );

  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "testUser" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "testPassword" },
  });

  fireEvent.click(screen.getByRole("button", { name: /log in/i }));

  expect(mockHandleSubmit).toHaveBeenCalledWith({
    username: "testUser",
    pwd: "testPassword",
  });

  expect(screen.getByLabelText(/username/i).value).toBe("");
  expect(screen.getByLabelText(/password/i).value).toBe("");
});

test("renders login form with invalid token", () => {
  const mockHandleSubmit = jest.fn();
  const token = "INVALID_TOKEN";

  render(
    <MemoryRouter>
      <Login token={token} handleSubmit={mockHandleSubmit} />
    </MemoryRouter>,
  );
});
