"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={true} />
        {children}
      </QueryClientProvider>
    </React.Fragment>
  );
};

export default Providers;
