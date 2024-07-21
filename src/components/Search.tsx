import { useSearchTopicContext } from "../lib/hooks";

function Search() {
  const { searchText, handleSearch } = useSearchTopicContext();

  return (
    <form className="text-center absolute inset-0 top-[12%]">
      <input
        type="search"
        spellCheck="false"
        value={searchText}
        onChange={handleSearch}
        placeholder="Find any topic/person here...."
        className="search-field py-3 pl-14 pr-6 outline-none min-w-[70%] rounded-md transition 
        bg-zinc-100 placeholder:text-zinc-500 text-xl
        text-dark focus-within:font-bold
        focus-within:bg-zinc-50 focus-within:ring focus-within:ring-blue-300
        "
      />
    </form>
  );
}

export default Search;
