import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type props = {
  handlePagination: (action: "previous" | "next") => void;
  next: string | null | undefined;
  previous: string | null | undefined;
};

const Paginator: React.FC<props> = ({ handlePagination, next, previous }) => {
  return (
    <>
      <div className="flex justify-start my-5">
        <div className="flex items-center space-x-2">
          {previous && (
            <button
              type="button"
              disabled={previous ? false : true}
              onClick={() => handlePagination("previous")}
              className={`rounded-lg h-14 aspect-square bg-primary w-fit flex items-center justify-center transition duration-300 ease-in-out text-primary-foreground hover:bg-primary/80 ${
                previous ? "hover:bg-primary-foreground cursor-pointer" : ""
              } `}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {next && (
            <button
              type="button"
              disabled={next ? false : true}
              onClick={() => handlePagination("next")}
              className={`rounded-lg h-14 aspect-square bg-primary w-fit flex items-center justify-center transition duration-300 ease-in-out text-primary-foreground hover:bg-primary/80 ${
                next ? "hover:bg-primary-foreground cursor-pointer" : ""
              } `}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {!next && <p className="text-">End of the list</p>}
        </div>
      </div>
    </>
  );
};

export default Paginator;
