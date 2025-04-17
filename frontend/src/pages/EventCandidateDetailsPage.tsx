import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { notFoundImg } from "@/assets";
import { callApi } from "@/lib/callApi";
import { TYCandidate } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Container, Navbar, SpinnerLoader } from "@/components";

const EventCandidateDetailsPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [candidate, setCandidate] = useState<TYCandidate | null>(null);
  const { eventSlug, candidateSlug } = useParams();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await callApi({
          endpoint: `events/${eventSlug}/candidates/${candidateSlug}/`,
        });
        setCandidate(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error(`Error fetching blog post: ${error}`);
      }
    };

    fetchCandidates();
  }, [candidateSlug, eventSlug]);

  console.log(candidate, "candidate man");

  return (
    <>
      <Navbar viewNav />

      <Container className="mt-0">
        {loading ? (
          <div>
            <SpinnerLoader className="h-10 w-10" />
          </div>
        ) : candidate ? (
          <div className={`relative`}>
            <div className="relative z-10 max-w-4xl">
              <h3 className="text-3xl mb-5">{candidate.full_name}</h3>
              <p className="mb-10">Candidate of {eventSlug}</p>

              <div className="w-full aspect-video max-w-md">
                <img
                  src={candidate.photo ? candidate.photo : ""}
                  alt="sdf"
                  className="w-full h-full rounded-md object-cover aspect-video"
                />
              </div>

              <section className="mt-5 flex items-center space-x-4">
                <div className="flex flex-col items-center justify-center w-fit">
                  <h2 className="mb-2">Votes</h2>
                  <h4 className="h-20 w-20 flex items-center justify-center bg-primary text-primary-foreground rounded-xl">
                    {candidate.vote_count}
                  </h4>
                </div>

                <div className="flex flex-col items-center justify-center w-fit">
                  <h2 className="mb-2">Vote No</h2>
                  <h4 className="h-20 w-20 flex items-center justify-center bg-primary text-primary-foreground rounded-xl">
                    {candidate.vote_number}
                  </h4>
                </div>
              </section>

              <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                <p className="line-clamp-4">{candidate.bio}</p>
              </div>

              <div className="mt-5">
                <Link
                  to={`/vote/${candidate.event_slug}/${candidate.slug}/`}
                  className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium  mt-3 px-4 py-2 rounded-lg tracking-wide text-orange-500"
                >
                  <div className="group p-5 cursor-pointer  relative text-xl font-normal border-0 flex items-center justify-center bg-transparent text-orange-500 h-auto w-[170px] overflow-hidden transition-all duration-100">
                    <span className=" group-hover:w-full absolute  left-0  h-full w-5 border-y border-l border-orange-500 transition-all duration-500"></span>

                    <h3 className="text-current group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all duration-200">
                      Vote me
                    </h3>

                    <h3 className="text-current group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200">
                      Procced
                    </h3>

                    <span className="group-hover:w-full absolute right-0 h-full w-5  border-y border-r  border-orange-500/90 transition-all duration-500"></span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-fit pt-10">
            <h1 className="font-black text-2xl pb-2">
              Candidate was not Found
            </h1>
            <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-5"></span>

            <div className="flex items-start flex-col flex-wrap">
              <img src={notFoundImg} className="w-24 h-24" alt="" />
              <p className="block mb-2">Make sure you have a valid url.</p>

              <Button type="button" className="p-5 cursor-pointer">
                <p>Reload</p>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default EventCandidateDetailsPage;
