import {
  ExternalLinkIcon,
  InstagramLogoIcon,
  Link2Icon,
  MagnifyingGlassIcon,
  StarFilledIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { abbreviateNumber, cn } from "../lib/utils";
import { useEffect, useState } from "react";
import { useActiveTopic } from "../lib/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addRatingToTopic, getTopicById } from "../lib/services";
import { queryClient } from "../lib/query";
import { Topic } from "../lib/types";
import useStore from "@/store/store";

const SocialIcons: Record<string, JSX.Element> = {
  Twitter: <TwitterLogoIcon />,
  Instagram: <InstagramLogoIcon />,
};

function TopicDescription() {
  const { activeId } = useActiveTopic();

  const user = useStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["topic", activeId],
    queryFn: async () => {
      if (activeId) {
        return await getTopicById(activeId);
      } else {
        return null;
      }
    },
  });

  const { mutate: triggerAddRating } = useMutation({
    mutationFn: async (variables: { rating: number }) => {
      return await addRatingToTopic(activeId, { rating: variables.rating });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["topic"],
      });
      queryClient.invalidateQueries({
        queryKey: ["topics"],
      });
    },
  });

  const activeTopic: Topic | undefined = data?.topic;
  const activeTopicRating: number | undefined = data?.userRating;

  useEffect(() => {
    const newStars = [];
    if (typeof activeTopicRating === "number") {
      for (let i = 0; i < 5; i++) {
        newStars.push({ filled: false });
        if (activeTopicRating >= i + 1) {
          newStars[i].filled = true;
        }
      }
      setStars(newStars);
    } else {
      if (user) {
        const newStars = [];
        for (let i = 0; i < 5; i++) {
          newStars.push({ filled: false });
          setStars(newStars);
        }
      } else {
        setStars([]);
      }
    }
  }, [activeTopicRating, user]);

  const [stars, setStars] = useState<{ filled: boolean }[]>([]);
  const handleStartFilling = (idx: number) => {
    triggerAddRating({ rating: idx + 1 });
  };

  const [hoveringIndex, setHoveringIndex] = useState(-1);
  const handleHover = (idx: number) => {
    setHoveringIndex(idx + 1);
  };
  const handleHoverLeave = () => {
    setHoveringIndex(-1);
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center flex-col">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (!activeTopic) {
    return (
      <div className="h-full flex items-center justify-center flex-col">
        <MagnifyingGlassIcon width={100} height={100} />
        <p className="h-100 text-center text-2xl mt-3">
          Search/Select above for any of the topic listed
        </p>
        <p className="text-zinc-600 text-lg">
          To get more details on the topic selected.
        </p>
      </div>
    );
  }

  const socials = activeTopic.socials
    ? activeTopic.socials.map((item) => {
        return { ...item, icon: SocialIcons[item.name] ?? <Link2Icon /> };
      })
    : [];

  return (
    <section className="h-full">
      <div className="bg-zinc-100 h-48 rounded-tr-md relative">
        <div className="ring ring-blue-300 bg-white rounded-full w-36 h-36 absolute top-[12%] left-[50%] translate-x-[-50%]"></div>
      </div>
      <header className="mt-5 text-center">
        <h3 className="text-3xl text-dark font-bold">{activeTopic.name}</h3>
        <sub className="text-xl text-dark">{activeTopic.category}</sub>
        <div className="flex gap-x-2 justify-center mt-4">
          {stars.map(({ filled }, idx) => (
            <Star
              key={idx}
              filled={filled}
              hover={idx < hoveringIndex}
              handleClick={() => handleStartFilling(idx)}
              handleMouseOver={() => handleHover(idx)}
              handleMouseLeave={handleHoverLeave}
            />
          ))}
        </div>
      </header>
      <article className="p-3">
        {activeTopic?.about ? (
          <div>
            <h4 className="text-xl font-semibold text-dark">About</h4>
            <p className="text-lg my-2 px-4 text-dark">{activeTopic.about}</p>
          </div>
        ) : null}
        <section className="flex justify-center my-7 xl:gap-[12rem] gap-12">
          <div className="space-y-1">
            <h4 className="text-xl text-center font-semibold text-dark">
              Ratings
            </h4>
            <div className="flex justify-center items-center gap-x-2">
              <StarFilledIcon
                className="text-yellow-400"
                width={20}
                height={20}
              />{" "}
              <span className="text-lg text-dark">
                <strong className="text-dark">{activeTopic.rating}</strong> (
                {abbreviateNumber(activeTopic.votes)})
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-xl text-center font-semibold text-dark">
              Ranking
            </h4>
            <div className="flex flex-col items-center justify-center gap-x-10">
              <p className="text-lg text-dark">
                <strong className="text-dark">
                  {activeTopic?.categoryRank
                    ? `#${activeTopic?.categoryRank}`
                    : "-"}
                </strong>{" "}
                {!!activeTopic?.categoryRank && `in ${activeTopic.category}`}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-xl text-center font-semibold text-dark">
              Overall
            </h4>
            <div className="flex flex-col items-center justify-center gap-x-10">
              <p className="text-lg text-dark">
                <span className="text-dark">
                  {activeTopic?.overallRank
                    ? `#${activeTopic?.overallRank}`
                    : "-"}
                </span>
              </p>
            </div>
          </div>
        </section>
        {socials.length ? (
          <div>
            <h4 className="text-xl font-semibold text-dark">Related Links</h4>
            <ul className="text-lg my-2 px-4  flex flex-wrap gap-x-10 gap-y-4">
              {socials.map(({ name, link, icon }, idx) => (
                <li key={idx}>
                  <a
                    href={link}
                    target="_blank"
                    className="flex gap-x-2 items-center text-dark hover:text-blue-600"
                  >
                    {icon} {name} <ExternalLinkIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    </section>
  );
}

function Star({
  filled,
  hover,
  handleClick,
  handleMouseOver,
  handleMouseLeave,
}: {
  filled: boolean;
  hover: boolean;
  handleClick: () => void;
  handleMouseOver: () => void;
  handleMouseLeave: () => void;
}) {
  return (
    <StarFilledIcon
      onClick={handleClick}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "text-zinc-300 w-10 h-10 transition cursor-pointer active:scale-90",
        {
          "text-yellow-400": filled,
          "text-yellow-400/60": hover,
        }
      )}
    />
  );
}

export default TopicDescription;
