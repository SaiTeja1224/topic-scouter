import { useContext, useEffect, useState } from "react";
import { TopicsContext } from "../contexts/TopicsContextProvider";
import { SearchTopicContext } from "../contexts/SearchTopicContextProvider";

export function useActiveTopic() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(window.location.hash.substring(1));
    };
    if (window.location.hash) {
      handleHashChange();
    }
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return { activeId };
}

export function useDebounceValue<T>(value: T, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

export function useTopicsContext() {
  const topicsContext = useContext(TopicsContext);
  if (!topicsContext) {
    throw new Error("TopicsContext must be used within TopicsContextProvider!");
  }

  return topicsContext;
}
export function useSearchTopicContext() {
  const searchTopicContext = useContext(SearchTopicContext);
  if (!searchTopicContext) {
    throw new Error(
      "SearchTopicContext must be used within SearchTopicContextProvider!"
    );
  }

  return searchTopicContext;
}
