import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "../src/components/Layout";
import NavBar from "../src/components/Layout/NavBar";

test("renders footer with correct text", () => {
  render(<Layout />);
  const footerText = screen.getByText(
    /Tymex Interview Frontend Nguyen Minh Nhut ©2024/i
  );
  expect(footerText).toBeInTheDocument();
});

test("renders Connect Wallet button visible in UI", () => {
  render(<Layout />);
  const connectWalletButton = screen.getByRole("button", {
    name: /Connect Wallet/i,
  });
  expect(connectWalletButton).toBeInTheDocument();
});
