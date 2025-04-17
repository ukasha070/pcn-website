import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { marked } from "marked";

import { notFoundImg } from "@/assets";
import { Clock } from "lucide-react";

import { Container, Navbar, SpinnerLoader } from "@/components";

import { callApi } from "@/lib/callApi";
import { formatDateToISOString } from "@/lib/utils";
import { TYCandidate, TYEventPost } from "@/lib/types";
import Candidate, { CandidateSkeleton } from "@/components/Candidates";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export function AnlyticsTab() {
  const { eventSlug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [candidates, setCandidates] = useState<TYCandidate[]>([]);
  const [graphData, setGraphData] = useState<{
    data: number[];
    labels: string[];
  }>({
    data: [],
    labels: [],
  });

  useEffect(() => {
    if (!eventSlug) return;

    async function fetchEventCandidates() {
      try {
        const response = await callApi<TYCandidate[]>({
          endpoint: `events/${eventSlug}/candidates`,
        });

        setCandidates(response);
      } catch (error: any) {
        setLoading(false);
        console.log("Status code:", error);
      }
    }
    fetchEventCandidates();
  }, [eventSlug]);

  useEffect(() => {
    if (candidates) {
      const votes = candidates.map((candidate) => candidate.vote_count);
      const names = candidates.map((candidate) => candidate.full_name);

      setGraphData({
        data: votes,
        labels: names,
      });

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [candidates]);

  const data = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Votes",
        data: graphData.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(255, 206, 86, 0.6)", // Yellow
          "rgba(75, 192, 192, 0.6)", // Green
        ],
      },
    ],
  };

  const options = {
    indexAxis: "y" as "y",
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div>
      {loading ? (
        <div>
          <SpinnerLoader className="h-5 w-5" />
        </div>
      ) : candidates.length ? (
        <Bar data={data} options={options} />
      ) : (
        <div className="w-full h-fit pt-10 flex items-start justify-start flex-col p-4">
          <h1 className="font-black text-base pb-2">
            Graph data not available
          </h1>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>I think there are no Candidates</li>
            <li>Error happened</li>
            <li>Email us if persists</li>
          </ul>

          <div className="flex items-center flex-wrap">
            <img src={notFoundImg} className="w-24 h-24" alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export function CandidatesTab() {
  const { eventSlug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [candidates, setCandidates] = useState<TYCandidate[]>([]);

  useEffect(() => {
    if (!eventSlug) return;

    async function fetchEventCandidates() {
      try {
        const response = await callApi<TYCandidate[]>({
          endpoint: `events/${eventSlug}/candidates`,
        });

        setCandidates(response);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (error.status) {
          console.log("Status code:", error);
        }
      }
    }
    fetchEventCandidates();
  }, [eventSlug]);

  return (
    <div className="my-10">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CandidateSkeleton key={i} />
          ))}
        </div>
      ) : !loading && !candidates?.length ? (
        <div className="w-full h-fit flex items-start justify-start flex-col">
          <h1 className="font-primary/80 text-2xl pb-2">
            Candidates not found...
          </h1>

          <div className="flex items-center flex-wrap">
            <img src={notFoundImg} className="w-24 h-24" alt="" />
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3">
          {candidates &&
            candidates.map((candidate) => (
              <Candidate key={candidate.slug} {...candidate} />
            ))}
        </div>
      )}
    </div>
  );
}

const EventDetailsPage = () => {
  const tabs = ["Content", "Candidates", "Anlytics"];

  const [loading, setLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<TYEventPost | null>(null);
  const [activeTab, setActiveTab] = useState<number>(
    localStorage.getItem("currentEventTab")
      ? parseInt(localStorage.getItem("currentEventTab")!)
      : 0
  );
  const [htmlContent, setHtmlContent] = useState<string>("");
  const { eventSlug } = useParams();

  useEffect(() => {
    if (!eventSlug) return;

    async function fetchEvent() {
      try {
        const response = await callApi<TYEventPost | null>({
          endpoint: `events/${eventSlug}/`,
        });

        setEvent(response);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (error.status) {
          console.log("Status code:", error);
        }
      }
    }
    fetchEvent();
  }, [eventSlug]);

  useEffect(() => {
    if (!event?.content_html) return;

    const generateHtml = async () => {
      const html = await marked(event?.content_html as string);
      setHtmlContent(html);
    };

    generateHtml();
  }, [event]);

  return (
    <>
      <Navbar />

      <Container className="py-5">
        {loading ? (
          <div className="animate-pulse max-w-5xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Event Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Banner */}
              <div className="w-full h-64 bg-gray-200 rounded-xl" />

              {/* Event Title */}
              <div className="h-10 bg-gray-300 rounded w-3/4" />
              {/* Event Date + Location */}
              <div className="flex items-center gap-4">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
              </div>

              {/* Event Description */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="h-32 bg-gray-200 rounded" />
                <div className="h-32 bg-gray-200 rounded" />
                <div className="h-32 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <div className="h-8 bg-gray-300 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />

              {/* Call to Action */}
              <div className="mt-6">
                <div className="h-10 bg-gray-300 rounded w-full" />
              </div>
            </div>
          </div>
        ) : !loading && !event ? (
          <div className="w-full h-fit pt-10 flex items-start justify-start flex-col">
            <h1 className="font-black text-2xl pb-2">Event was not Found</h1>

            <div className="flex items-center flex-wrap">
              <img src={notFoundImg} className="w-24 h-24" alt="" />
            </div>
          </div>
        ) : (
          <section>
            <ul className="flex flex-wrap text-sm font-medium text-center text-primary/70 py-2">
              {tabs.map((tab, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab(index);
                    localStorage.setItem("currentTab", index.toString()); // Make sure to use `index.toString()` here
                  }}
                  className={`tab-button ${
                    activeTab === index
                      ? "active inline-flex items-center justify-center p-4 text-orange-600 border-b-2 border-orange-600 rounded-t-lg dark:text-orange-500 dark:border-orange-500 group"
                      : "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                  }`}
                >
                  <h4 className="text-base text-current">{tab}</h4>
                </button>
              ))}
            </ul>

            {/* [[[[ content ]]]] */}
            {activeTab === 0 ? (
              <section>
                <div className="pt-10">
                  <h2 className="text-4xl capitalize mb-2">{event?.title}</h2>
                  <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-10"></span>

                  <p className="block mt-5 text-lg">{event?.description}</p>

                  <div className="my-5 py-5">
                    <div className="flex flex-wrap items-center gap-x-4 text-sm">
                      <div className="flex items-center text-gray-500">
                        <div>
                          <Clock className="text-sm w-4 h-4" />
                        </div>
                        <time dateTime={event?.created_at} className=" pl-2">
                          {formatDateToISOString(event?.created_at || "")}
                        </time>
                      </div>
                      {event?.tags?.map((tag) => (
                        <p
                          key={tag.slug}
                          className="px-3 py-2 font-medium text-accent-foreground"
                        >
                          {tag.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <article
                  id="markdown-content"
                  dangerouslySetInnerHTML={{
                    __html: htmlContent,
                  }}
                ></article>
              </section>
            ) : activeTab === 1 ? (
              <CandidatesTab />
            ) : (
              <AnlyticsTab />
            )}

            {/* [[[[ Candidates ]]]] */}
          </section>
        )}
      </Container>
    </>
  );
};

export default EventDetailsPage;
