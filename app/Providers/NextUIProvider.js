"use client";

import { NextUIProvider } from "@nextui-org/react";

export const NextuiProvider = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
