import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { callApi } from "@/lib/callApi";
import { TYCandidate } from "@/lib/types";
import {
  Container,
  Navbar,
  SpinnerLoader,
  VotePaymentForm,
} from "@/components";
import { notFoundImg } from "@/assets";

import { Helmet } from "react-helmet";

const VotePage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [candidate, setCandidate] = useState<TYCandidate>();
  const [candidates, setCandidates] = useState<TYCandidate[]>([]);

  const { eventSlug, candidateSlug } = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchCandidate = async () => {
      try {
        const response = await callApi<TYCandidate>({
          endpoint: `events/${eventSlug}/candidates/${candidateSlug}/`,
        });
        setCandidate(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error(`Error candidates: ${error}`);
      }
    };

    const fetchCandidates = async () => {
      try {
        const response = await callApi<TYCandidate[]>({
          endpoint: `events/${eventSlug}/candidates/`,
        });
        setCandidates(response);
      } catch (error) {
        throw new Error(`Error fetching blog post: ${error}`);
      }
    };

    fetchCandidate();
    fetchCandidates();
  }, [candidateSlug, eventSlug]);

  const changeCandidate = (newCandidateSlug: string) => {
    if (newCandidateSlug === "0") return;
    const newPath = `/vote/${eventSlug}/${newCandidateSlug}/`;
    navigate(newPath);
  };

  return (
    <>
      <Helmet>
        <title>
          {`Vote | ${candidate?.vote_number} ${candidate?.full_name}`}
        </title>
        <meta
          name="description"
          content="Read impactful stories and updates from Prosfygas Christian Network."
        />
        <link rel="canonical" href="https://yourdomain.com/blog" />
      </Helmet>

      <Navbar viewNav />

      <Container className="mb-0 p-0">
        {loading ? (
          <div
            className={
              "aspect-square w-fit flex flex-col space-y-3 justify-center items-center mx-auto mb-10 tex-center"
            }
          >
            <SpinnerLoader />
            {eventSlug !== "callback" ? (
              <h3 className="text-gray-400 whitespace-nowrap">
                Loading wait....
              </h3>
            ) : (
              <h3>Verifying Your Payment. A moment</h3>
            )}
          </div>
        ) : candidate ? (
          <div className="py-10">
            <div className="mb-10">
              <h1 className="font-black text-2xl pb-2">Vote your Candidate</h1>
              <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-6"></span>
              <p className="text-lg/8 text-gray-600 max-w-4xl">
                Please take a moment to cast your vote for your preferred
                candidate. Your vote is important
              </p>
            </div>

            <div className="flex items-start flex-col sm:flex-row flex-warp gap-5 mb-10">
              <div className="h-55 w-55 aspect-square bg-accent">
                <img
                  src={candidate?.photo ? candidate?.photo : ""}
                  alt={"user"}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className={""}>
                <h3 className="text-xl mb-4">{candidate?.full_name}</h3>
                <p className="text-base max-w-2xl text-primary/70">
                  {candidate?.bio}
                </p>
                <div className="mt-5 flex items-center space-x-4">
                  <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="mb-2">Votes</h2>
                    <h4 className="h-20 w-fit flex items-center justify-center">
                      {candidate?.vote_count}
                    </h4>
                  </div>

                  <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="mb-2">Vote No</h2>
                    <h4 className="h-20 w-fit flex items-center justify-center">
                      {candidate?.vote_number}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <VotePaymentForm
                candidates={candidates}
                currentCandidate={candidate}
                changeCandidate={changeCandidate}
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-fit pt-10 flex items-start justify-start flex-col">
            <h1 className="font-black text-2xl pb-2">Candidate not Found...</h1>
            <p>Make sure you have a valid url</p>
            <p>
              If persist mail us{" "}
              <Link
                className="text-orange-500 underline"
                to={"mailTo:mail@prosfyges-christian-network.org"}
              >
                here
              </Link>
            </p>

            <div className="flex items-center flex-wrap">
              <img src={notFoundImg} className="w-24 h-24" alt="" />
            </div>
          </div>
        )}

        {/* <SuccessVote /> */}
      </Container>
    </>
  );
};

export default VotePage;
