import { createContext, useState } from "react";
import { useDebounceValue } from "../lib/hooks";

type TSearchTopicContext = {
  searchText: string;
  debouncedSearchText: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchTopicContext = createContext<TSearchTopicContext | null>(
  null
);

export function SearchTopicContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const debouncedSearchText = useDebounceValue(searchText);

  return (
    <SearchTopicContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleSearch,
      }}
    >
      {children}
    </SearchTopicContext.Provider>
  );
}
