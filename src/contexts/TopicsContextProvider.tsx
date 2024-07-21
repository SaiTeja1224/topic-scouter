import { createContext, useState } from "react";
import { Topic } from "../lib/types";
import { useSearchTopicContext } from "../lib/hooks";
import { useQuery } from "@tanstack/react-query";
import { getTopics } from "../lib/services";

type TSortBy = "RATING" | "VOTES";
type TSortOrder = "ASC" | "DESC";

export const TopicsContext = createContext<{
  topics: Topic[];
  sortBy: TSortBy;
  sortOrder: TSortOrder;
  handleSortBy: (val: TSortBy) => void;
  handleSortOrder: (val: TSortOrder) => void;
} | null>(null);

export default function TopicsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debouncedSearchText: searchText } = useSearchTopicContext();

  const [sortBy, setSortBy] = useState<TSortBy>("RATING");

  const handleSortBy = (val: TSortBy) => {
    setSortBy(val);
  };
  const [sortOrder, setSortOrder] = useState<TSortOrder>("DESC");

  const handleSortOrder = (val: TSortOrder) => {
    setSortOrder(val);
  };

  const { data } = useQuery({
    queryKey: ["topics", searchText, sortBy, sortOrder],
    queryFn: () => getTopics({ searchText, sortBy, sortOrder }),
  });

  const topics: Topic[] = data || [];

  return (
    <TopicsContext.Provider
      value={{
        topics,
        sortBy,
        sortOrder,
        handleSortBy,
        handleSortOrder,
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
}
