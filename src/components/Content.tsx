import TopicDescription from "./TopicDescription";
import TopicList from "./TopicList";

function Content() {
  return (
    <section className="flex h-full">
      <div className="border-r-2 border-zinc-100 basis-[40%]">
        <TopicList />
      </div>
      <div className="basis-[100%] bg-white/30 rounded-md overflow-auto">
        <TopicDescription />
      </div>
    </section>
  );
}

export default Content;
