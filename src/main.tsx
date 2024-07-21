import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import TopicsContextProvider from "./contexts/TopicsContextProvider.tsx";
import { SearchTopicContextProvider } from "./contexts/SearchTopicContextProvider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchTopicContextProvider>
        <TopicsContextProvider>
          <App />
        </TopicsContextProvider>
      </SearchTopicContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
