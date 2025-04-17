// Core Libraries
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Helmet } from "react-helmet";

// Project Components
import { BlogPost, BlogPostSkeleton } from "@/components/BlogPosts";
import { Navbar, Container, Paginator } from "@/components";

// Project Utilities and Types
import { TYBlogPost, TYPaginate } from "@/lib/types";
import { getPageNumber } from "@/lib/utils";
import { callApi } from "@/lib/callApi";

// Assets
import { notFoundImg } from "@/assets";

const BlogsPage = () => {
  const [posts, setPosts] = useState<TYPaginate<TYBlogPost> | null>(null);
  const [fetchURL, setFetchURL] = useState<string>("/api/blogs");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const fetchBlogs = async () => {
      try {
        const response = await callApi<TYPaginate<TYBlogPost>>({
          endpoint: `blogs/`,
        });

        setPosts(response);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);

        if (error.status) {
          console.log("Status code:", error.status);
        }
      }
    };

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
          setFetchURL(`/api/blogs/?page=${pageNum}`); // use the full `next` URL
        }
        break;
      }

      case "previous": {
        if (posts.previous) {
          var pageNum = getPageNumber(posts?.previous);
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
        <title>The Blogs | PCN</title>
        <meta
          name="description"
          content="Read impactful stories and updates from Prosfygas Christian Network."
        />
        <link rel="canonical" href="https://yourdomain.com/blog" />
      </Helmet>

      <Navbar viewNav />

      <Container className="pb-5 pt-0">
        <section className="my-10">
          <h2 className="text-2xl font-semibold tracking-tight text-pretty">
            The Blogs
          </h2>
          <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-10"></span>

          <p className="text-lg max-w-4xl">
            Stories of hope, faith, and transformation from our mission. Stay
            updated with inspiring testimonies and the impact we're making
            together.
          </p>
        </section>

        {/* /// blogs */}
        <div className="my-10">
          {loading ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {Array.from({ length: 3 }).map((_, i) => (
                <BlogPostSkeleton key={`Bl_Sk_${i}`} />
              ))}
            </div>
          ) : posts && posts.results && posts?.results.length ? (
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none xl:grid-cols-3">
              {posts?.results.map((post) => (
                <BlogPost {...post} key={`Bl_${post.slug}`} />
              ))}
            </div>
          ) : (
            <div className="w-full h-fit pt-10 flex items-start justify-start flex-col">
              <h1 className="font-black text-2xl pb-2">No Blogs...</h1>

              <div className="flex items-center flex-wrap">
                <img src={notFoundImg} className="w-24 h-24" alt="" />
              </div>
            </div>
          )}
        </div>

        <Paginator
          handlePagination={handlePagination}
          next={posts?.next}
          previous={posts?.previous}
        />
      </Container>
    </>
  );
};

export default BlogsPage;
