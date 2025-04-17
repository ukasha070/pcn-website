import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";

import { notFoundImg } from "@/assets";

import { getPageNumber } from "@/lib/utils";
import { CandidateSkeleton } from "@/components/Candidates";
import { BlogPostSkeleton, BlogPost } from "@/components/BlogPosts";
import { EventPostSkeleton, EventPost } from "@/components/EventPosts";
import { Container, Navbar, Candidate, Paginator } from "@/components";
import { TYPaginate, TYBlogPost, TYEventPost, TYCandidate } from "@/lib/types";
import { callApi } from "@/lib/callApi";
import SearchBox from "@/components/SearchBox";

export const BlogsTab = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<TYPaginate<TYBlogPost> | null>(null);

  const [fetchURL, setFetchURL] = useState<string>(`search/blogs/?q=${query}`);

  useEffect(() => {
    setLoading(true);

    async function fetchBlogs() {
      try {
        const response = await callApi<TYPaginate<TYBlogPost>>({
          endpoint: `${fetchURL}`,
        });

        setPosts(response);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [fetchURL]);

  const handlePagination = (action: string) => {
    if (!posts?.previous && !posts?.next) return;

    switch (action) {
      case "next": {
        if (posts.next) {
          var pageNum = getPageNumber(posts?.next);
          if (!pageNum) {
            toast.success("Reached the end of the list.");
          }
          setFetchURL(`search/blogs/?page=${pageNum}&q=${query}`); // use the full `next` URL
        }
        break;
      }

      case "previous": {
        if (posts.previous) {
          var pageNum = getPageNumber(posts?.previous);
          if (!pageNum) pageNum = 1;
          setFetchURL(`search/blogs/?page=${pageNum}&q=${query}`); // use the full `previous` URL
        }
        break;
      }

      default:
        break;
    }
  };

  return (
    <div className="my-10">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogPostSkeleton key={`blog-${i}`} />
          ))}
        </div>
      ) : !loading && !posts?.count ? (
        <div className="w-full h-fit flex items-start justify-start flex-col">
          <h1 className="font-black text-2xl pb-2">No Blogs...</h1>

          <div className="flex items-center flex-wrap">
            <img src={notFoundImg} className="w-24 h-24" alt="" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {posts?.results.map((post) => (
            <BlogPost {...post} key={post.slug} />
          ))}
        </div>
      )}

      <div>
        <Paginator
          handlePagination={handlePagination}
          next={posts?.next}
          previous={posts?.previous}
        />
      </div>
    </div>
  );
};

export const EventsTab = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [events, setPosts] = useState<TYPaginate<TYEventPost> | null>(null);
  const [fetchURL, setFetchURL] = useState<string>(`search/events/?q=${query}`);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await callApi<TYPaginate<TYEventPost>>({
          endpoint: `${fetchURL}`,
        });

        setPosts(response);
        setLoading(false);
      } catch (err) {
        console.log(err);
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
          setFetchURL(`search/events/?page=${pageNum}&q=${query}`); // use the full `next` URL
        }
        break;
      }

      case "previous": {
        if (events.previous) {
          var pageNum = getPageNumber(events?.previous);
          if (!pageNum) pageNum = 1;
          setFetchURL(`search/events/?page=${pageNum}&q=${query}`); // use the full `previous` URL
        }
        break;
      }

      default:
        break;
    }
  };

  return (
    <div className="my-10">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <EventPostSkeleton key={i} />
          ))}
        </div>
      ) : !loading && !events?.count ? (
        <div className="w-full h-fit flex items-start justify-start flex-col">
          <h1 className="font-black text-2xl pb-2">No Events...</h1>

          <div className="flex items-center flex-wrap">
            <img src={notFoundImg} className="w-24 h-24" alt="" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {events?.results.map((event) => (
            <EventPost {...event} key={event.slug} />
          ))}
        </div>
      )}

      <Paginator
        handlePagination={handlePagination}
        next={events?.next}
        previous={events?.previous}
      />
    </div>
  );
};

export const CandidatesTab = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [candidates, setCandidates] = useState<TYPaginate<TYCandidate> | null>(
    null
  );
  const [fetchURL, setFetchURL] = useState<string>(
    `search/candidates/?q=${query}`
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const response = await callApi<TYPaginate<TYCandidate>>({
          endpoint: `${fetchURL}`,
        });

        var pagURL: URL = new URL(fetchURL, window.location.origin);
        const pagURLParams: URLSearchParams = pagURL.searchParams;
        const pagNum = pagURLParams.get("page");

        if (pagNum) {
          setCandidates((oldData) => {
            if (!oldData) return null;
            return {
              ...oldData,
              results: [...oldData.results, ...response.results],
              next: response.next,
              previous: response.previous,
            };
          });
        } else {
          setCandidates(response);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    fetchCandidates();
  }, [fetchURL]);

  const handlePagination = (action: string) => {
    if (!candidates?.previous && !candidates?.next) return;

    switch (action) {
      case "next": {
        if (candidates.next) {
          var pageNum = getPageNumber(candidates?.next);
          if (!pageNum) {
            toast.success("Reached the end of the list.");
          }
          setFetchURL(`search/candidates/?page=${pageNum}&q=${query}`); // use the full `next` URL
        }
        break;
      }

      case "previous": {
        if (candidates.previous) {
          var pageNum = getPageNumber(candidates?.previous);
          if (!pageNum) pageNum = 1;
          setFetchURL(`search/events/?page=${pageNum}&q=${query}`); // use the full `previous` URL
        }
        break;
      }

      default:
        break;
    }
  };

  return (
    <div className="my-10">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CandidateSkeleton key={i} />
          ))}
        </div>
      ) : !loading && !candidates?.count ? (
        <div className="w-full h-fit flex items-start justify-start flex-col">
          <h1 className="font-black text-2xl pb-2">No candidate found...</h1>

          <div className="flex items-center flex-wrap">
            <img src={notFoundImg} className="w-24 h-24" alt="" />
          </div>
        </div>
      ) : (
        <div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {candidates &&
              candidates.results.map((candidate) => (
                <Candidate key={candidate.slug} {...candidate} />
              ))}
          </div>

          <div className="flex items-center justify-center">
            {candidates && candidates.next ? (
              <button
                type="button"
                onClick={() => handlePagination("next")}
                className="p-4 px-7 bg-primary rounded-xl cursor-pointer"
              >
                <h4 className="text-primary-foreground text-sm">Load More</h4>
              </button>
            ) : (
              <div>End of Candidates</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [activeTab, setActiveTab] = useState<number>(
    localStorage.getItem("currentTab")
      ? parseInt(localStorage.getItem("currentTab")!)
      : 0
  );

  // Define your tab names and content
  const tabs = ["Blogs", "Events", "Candidates"];
  const content: React.ReactNode[] = [
    <BlogsTab />,
    <EventsTab />,
    <CandidatesTab />,
  ];
  return (
    <>
      <Navbar />

      <Container className="py-0 my-0">
        <div className="py-4">
          <SearchBox />
        </div>

        <section className="border-b border-accent">
          <h3 className="my-4 pl-3">Search for `{query}`</h3>

          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-primary/70">
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
        </section>

        <section className="pt-5">{content[activeTab]}</section>
      </Container>
    </>
  );
};

export default SearchPage;
