"use client";

import React from "react";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      color="#FB0F40"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default Provider;
