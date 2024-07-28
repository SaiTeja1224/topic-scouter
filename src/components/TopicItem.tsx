import { StarFilledIcon } from "@radix-ui/react-icons";
import { abbreviateNumber, cn } from "../lib/utils";
import { Topic } from "../lib/types";

function TopicItem({ topic, isActive }: { topic: Topic; isActive: boolean }) {
  return (
    <li
      className={cn(
        "border-b-2 border-zinc-100 hover:bg-zinc-100 cursor-pointer active:scale-95 transition",
        {
          "bg-zinc-100": isActive,
        }
      )}
    >
      <a
        href={`#${topic._id}`}
        className={"flex justify-between items-center p-4"}
      >
        <div>
          <h3 className="text-2xl font-bold text-dark leading-none">
            {topic.name}
          </h3>
          <sub className="text-base text-dark">{topic.category}</sub>
        </div>
        <div className="flex items-center gap-x-2">
          <StarFilledIcon className="text-yellow-400" width={20} height={20} />{" "}
          <span className="text-lg text-dark">
            <strong className="text-dark">{topic.rating}</strong> (
            {abbreviateNumber(topic.votes)})
          </span>
        </div>
      </a>
    </li>
  );
}

export default TopicItem;
