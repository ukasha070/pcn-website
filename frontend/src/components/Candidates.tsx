import React from "react";
import { Link } from "react-router-dom";
import { TYCandidate } from "@/lib/types";

export const CandidateSkeleton = () => {
  return (
    <div className="flex-shrink-0 m-6 relative overflow-hidden bg-neutral-200 rounded-lg max-w-xs shadow-lg">
      <svg
        className="absolute bottom-0 left-0 mb-8 animate-pulse"
        viewBox="0 0 375 283"
        fill="none"
        style={{ transform: "scale(1.5)", opacity: 0.1 }}
      >
        <rect
          x="159.52"
          y="175"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill="white"
        />
        <rect
          y="107.48"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 0 107.48)"
          fill="white"
        />
      </svg>
      <div className="relative pt-10 px-10 flex items-center justify-center">
        <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3 bg-gray-200 animate-pulse"></div>
      </div>
      <div className="relative text-primary-foreground px-6 pb-6 mt-6">
        <span className="block opacity-75 text-sm mb-2 text-primary-foreground p-2 w-full bg-gray-300 animate-pulse"></span>
        <div className="flex justify-between">
          <div>
            <h4 className="block font-semibold text-xl text-current bg-gray-300 animate-pulse h-6 w-32 mb-2"></h4>
            <p className="text-sm bg-gray-300 animate-pulse h-4 w-48 mb-2"></p>
          </div>
          <span className="bg-primary-foreground rounded-full text-orange-500 font-bold px-3 py-2 leading-none flex items-center text-xl">
            <div className="bg-gray-300 animate-pulse h-6 w-12"></div>
          </span>
        </div>
      </div>
    </div>
  );
};

const Candidate: React.FC<TYCandidate> = ({ ...candidate }) => {
  return (
    <>
      <div className="bg-primary-foreground overflow-hidden">
        <Link
          to={`/vote/${candidate.event_slug}/${candidate.slug}/`}
          className="block pt-4 py-0"
        >
          <img
            className="w-full h-56 aspect-square object-cover"
            src={candidate.photo}
            alt="avatar"
          />
          <div className="flex items-center justify-center py-3 text-primary text-center">
            <p className="test-sm">{candidate.full_name}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Candidate;
