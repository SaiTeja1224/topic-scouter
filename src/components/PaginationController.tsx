import { useTopicsContext } from "@/lib/hooks";
import { Button } from "./ui/button";

function PaginationController() {
  const { totalPages, currentPage, handleSetPage } = useTopicsContext();

  const handlePagination = (type: "PREV" | "NEXT") => {
    if (currentPage === 1 && type === "PREV") {
      return;
    }
    if (currentPage === totalPages && type === "NEXT") {
      return;
    }

    if (type == "PREV") {
      handleSetPage(currentPage - 1);
    }
    if (type == "NEXT") {
      handleSetPage(currentPage + 1);
    }
  };

  return (
    <section className="border-t border-zinc-200 mt-auto p-2 flex justify-between">
      {currentPage > 1 && (
        <Button
          variant={"outline"}
          className="px-8"
          onClick={() => handlePagination("PREV")}
        >
          Prev
        </Button>
      )}
      {currentPage < totalPages && (
        <Button
          variant={"outline"}
          className="px-8 ms-auto"
          onClick={() => handlePagination("NEXT")}
        >
          Next
        </Button>
      )}
    </section>
  );
}

export default PaginationController;
