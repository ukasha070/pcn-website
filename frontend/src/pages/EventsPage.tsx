import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import { EventPost, EventPostSkeleton } from "@/components/EventPosts";
import Paginator from "@/components/Paginator";

import { getPageNumber } from "@/lib/utils";
import { TYPaginate, TYEventPost } from "@/lib/types";

import { notFoundImg } from "@/assets";
import { callApi } from "@/lib/callApi";

const EventsPage = () => {
  const [events, setPosts] = useState<TYPaginate<TYEventPost> | null>(null);
  const [fetchURL, setFetchURL] = useState<string>("events/");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await callApi<TYPaginate<TYEventPost>>({
          endpoint: fetchURL,
        });
        setPosts(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching: ", error);
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [fetchURL]);

  const handlePagination = (action: string) => {
    if (!events?.previous && !events?.next) return;

    switch (action) {
      case "next": {
        if (events.next) {
          var pageNum = getPageNumber(events?.next);
          if (!pageNum) {
            toast.success("Reached the end of the list.");
          }
          setFetchURL(`/api/blogs/?page=${pageNum}`); // use the full `next` URL
        }
        break;
      }

      case "previous": {
        if (events.previous) {
          var pageNum = getPageNumber(events?.previous);
          if (!pageNum) pageNum = 1;
          setFetchURL(`/api/blogs/?page=${pageNum}`); // use the full `previous` URL
        }
        break;
      }

      default:
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title>The Events | PCN</title>
        <meta
          name="description"
          content="Discover upcoming programs, community outreaches, and special gatherings that drive our mission forward."
        />
        <link rel="canonical" href="https://yourdomain.com/events/" />
      </Helmet>

      <Navbar viewNav />

      <Container className="pb-5 pt-0">
        <section className="my-10">
          <h2 className="text-2xl font-semibold tracking-tight text-pretty">
            The Events
          </h2>
          <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-10"></span>

          <p className="text-lg max-w-4xl">
            Discover upcoming programs, community outreaches, and special
            gatherings that drive our mission forward
          </p>
        </section>

        {/* /// blogs */}
        <div className="my-10">
          {loading ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {Array.from({ length: 2 }).map((_, i) => (
                <EventPostSkeleton key={i} />
              ))}
            </div>
          ) : events && events.results && events?.results.length ? (
            <div className="grid grid-cols-1 gap-8 lg:mx-0">
              {events?.results.map((event) => (
                <EventPost {...event} key={event.slug} />
              ))}
            </div>
          ) : (
            <div className="w-full h-fit pt-10 flex items-start justify-start flex-col">
              <h1 className="font-black text-2xl pb-2">No Events...</h1>

              <div className="flex items-center flex-wrap">
                <img src={notFoundImg} className="w-24 h-24" alt="" />
              </div>
            </div>
          )}
        </div>

        <Paginator
          handlePagination={handlePagination}
          next={events?.next}
          previous={events?.previous}
        />
      </Container>
    </>
  );
};

export default EventsPage;
