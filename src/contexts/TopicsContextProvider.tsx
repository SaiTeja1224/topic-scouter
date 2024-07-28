import { createContext, useState } from "react";
import { Topic } from "../lib/types";
import { useSearchTopicContext } from "../lib/hooks";
import { useQuery } from "@tanstack/react-query";
import { getTopics } from "../lib/services";

type TSortBy = "RATING" | "VOTES";
type TSortOrder = "ASC" | "DESC";

export const TopicsContext = createContext<{
  topics: Topic[];
  totalPages: number;
  sortBy: TSortBy;
  sortOrder: TSortOrder;
  currentPage: number;
  handleSetPage: (val: number) => void;
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

  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 7;

  const handleSetPage = (val: number) => {
    setCurrentPage(val);
  };

  const { data } = useQuery({
    queryKey: ["topics", searchText, sortBy, sortOrder, currentPage],
    queryFn: () =>
      getTopics({
        search: searchText,
        sortBy,
        sortOrder,
        page: currentPage.toString(),
        limit: LIMIT.toString(),
      }),
  });

  const topics: Topic[] = data?.topics || [];
  const total: number = data?.totalCount || [];
  const totalPages = Math.round(total / LIMIT);

  return (
    <TopicsContext.Provider
      value={{
        topics,
        totalPages,
        sortBy,
        sortOrder,
        currentPage,
        handleSetPage,
        handleSortBy,
        handleSortOrder,
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
}
