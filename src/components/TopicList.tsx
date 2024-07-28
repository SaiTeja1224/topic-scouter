import { cn } from "@/lib/utils";
import { useActiveTopic, useTopicsContext } from "../lib/hooks";
import TopicItem from "./TopicItem";
import { Button } from "./ui/button";
import PaginationController from "./PaginationController";

function TopicList() {
  const { activeId } = useActiveTopic();
  const { topics, sortBy, sortOrder, handleSortBy, handleSortOrder } =
    useTopicsContext();
  return (
    <section className="h-full min-h-full flex flex-col">
      <header className="border-b-2 border-zinc-100 p-2 flex items-center justify-between">
        <img
          src="/sorting.png"
          width={34}
          height={34}
          onClick={() => handleSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")}
          className={cn("p-1 cursor-pointer active:scale-95", {
            "bg-gray-200 rounded-full": sortOrder === "ASC",
            "hover:bg-gray-50": sortOrder === "DESC",
          })}
        />
        <div className="space-x-2">
          <Button
            variant={sortBy === "VOTES" ? "default" : "outline"}
            className="h-8"
            onClick={() => handleSortBy("VOTES")}
          >
            Votes
          </Button>
          <Button
            variant={sortBy === "RATING" ? "default" : "outline"}
            className="h-8"
            onClick={() => handleSortBy("RATING")}
          >
            Ratings
          </Button>
        </div>
      </header>
      <ul>
        {topics.map((topic) => (
          <TopicItem
            key={topic._id}
            topic={topic}
            isActive={activeId === topic._id}
          />
        ))}
      </ul>
      <PaginationController />
    </section>
  );
}

export default TopicList;
