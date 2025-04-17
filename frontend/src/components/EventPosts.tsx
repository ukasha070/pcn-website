import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import { notFoundImg } from "@/assets";
import { TYEventPost, TYPaginate } from "@/lib/types";
import { formatDateToISOString } from "@/lib/utils";
import { callApi } from "@/lib/callApi";
import { AudioLines, CalendarCheck2 } from "lucide-react";

export const EventPost: React.FC<TYEventPost> = ({ ...event }) => {
  return (
    <article key={event.slug} className="block">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-10">
        <div className="basis-2/6">
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-full aspect-[5/3] object-cover rounded-4xl"
          />
        </div>

        <div className="basis-4/6">
          <Link to={`/events/${event.slug}/`} className="block z-10">
            <h3 className="z-10 mt-3 text-3xl font-bold mb-4">{event.title}</h3>
            <div className="z-10 gap-y-1 overflow-hidden leading-6 text-primary/70 line-clamp-3 text-base">
              {event.description}
            </div>
          </Link>

          <div className="mt-5 flex items-center space-x-4 font-chealse">
            <span>{formatDateToISOString(event.created_at)}</span>
            {event.is_done ? (
              <div className="text-red-500  flex items-center space-x-2">
                <CalendarCheck2 className="stroke-current stroke-2 h-6 w-6 block" />
                <span className="font-chealse">Ended</span>
              </div>
            ) : (
              <div className="text-green-500 font-chealse flex items-center space-x-2">
                <AudioLines className="stroke-current stroke-3 fill-current h-6 w-6 block" />
                <span className="font-chealse">Current</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export const EventPostSkeleton = () => {
  return (
    <article className="p-6 animate-pulse">
      {/* Top Meta Info */}
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="text-xs inline-flex items-center px-2.5 py-0.5 rounded bg-gray-300 text-gray-300">
          <div className="w-4 h-4 mr-2 bg-gray-300 rounded-full" />
          <div className="h-3 w-12 bg-gray-300 rounded" />
        </span>
        <span className="text-sm h-3 w-16 bg-gray-300 rounded" />
      </div>

      {/* Title */}
      <div className="mb-5">
        <div className="h-6 w-3/4 bg-gray-300 rounded" />
      </div>

      {/* Image Placeholder */}
      <div className="mb-5 w-full aspect-video overflow-hidden sm:px-10 xl:px-3">
        <div className="h-full w-full bg-gray-300 rounded-2xl" />
      </div>

      {/* Description */}
      <div className="mb-5 space-y-2">
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 rounded" />
        <div className="h-4 w-4/6 bg-gray-300 rounded" />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-7 h-7 rounded-full bg-gray-300" />
          <div className="h-4 w-20 bg-gray-300 rounded" />
        </div>
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </div>
    </article>
  );
};

const EventPosts = () => {
  const [events, setEvents] = useState<TYPaginate<TYEventPost> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await callApi<TYPaginate<TYEventPost>>({
          endpoint: "events/",
        });

        setEvents(response);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);

        if (error.status) {
          console.log("Status code:", error.status);
        }
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container>
      <div className="animate-onscroll">
        <h1 className="font-black text-2xl pb-2">The Events</h1>
        <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-10"></span>

        <p className="text-lg max-w-4xl">
          Here, you’ll find a list of events that have been carefully planned
          and are ready for you to enjoy. Whether you're looking for
          inspiration, fun, or community activities, we have something for
          everyone
        </p>
      </div>

      <section className="mt-10">
        {loading ? (
          <div className="grid lg:grid-cols-2 w-full gap-10 ">
            {Array.from({ length: 2 }).map((_, i) => (
              <EventPostSkeleton key={`Ev_Sk_-${i}`} />
            ))}
          </div>
        ) : events && events.results && events?.results.length ? (
          <div className="grid w-full gap-10 ">
            {events.results.map((event) => (
              <EventPost {...event} key={`Ev_${event.slug}`} />
            ))}
          </div>
        ) : (
          <div className="w-full h-fit pt-10 flex items-center justify-center flex-col">
            <h1 className="font-black text-2xl pb-2">No Events...</h1>

            <div className="flex items-center flex-wrap">
              <img src={notFoundImg} className="w-24 h-24" alt="" />
            </div>
          </div>
        )}
      </section>
    </Container>
  );
};

export default EventPosts;
