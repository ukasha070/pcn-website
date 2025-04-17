// External Libraries
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Layout / UI Components
import Container from "./Container";

// Assets
import { notFoundImg } from "@/assets";

// Types
import { TYBlogPost, TYPaginate } from "@/lib/types";
import { callApi } from "@/lib/callApi";

// Utilities
import { formatDateToISOString } from "@/lib/utils";

export const BlogPost: React.FC<TYBlogPost> = ({ ...post }) => {
  return (
    <article
      id={`blog-${post.slug}`}
      className="flex max-w-xl flex-col items-start justify-between px-5 animate-onscroll"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post.created_at} className="text-gray-500">
          {formatDateToISOString(post.created_at)}
        </time>
        {post.tags &&
          post.tags.map((tag) => (
            <Link
              key={tag.slug}
              to={tag.slug}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {tag.name}
            </Link>
          ))}
      </div>

      {/* Thumbnail Section */}
      <div className="w-full mt-4">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-48 object-cover rounded-2xl shadow-md"
        />
      </div>

      <div className="group relative">
        <h3 className="mt-3 text-2xl font-semibold group-hover:text-gray-600">
          <a href={`/blogs/${post.slug}`}>
            <span className="absolute inset-0" />
            {post.title}
          </a>
        </h3>
        <p className="mt-2 text-base line-clamp-3 text-gray-600">
          {post.description}
        </p>
      </div>

      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          alt={post.author.name}
          src={post.author.profile_picture}
          className="size-10 rounded-full bg-gray-50"
        />
        <div className="text-sm">
          <p className="font-semibold text-gray-900">{post.author.name}</p>
          <p className="text-gray-600">{post.author.role}</p>
        </div>
      </div>
    </article>
  );
};

export const BlogPostSkeleton = () => {
  return (
    <article
      key={`0`}
      className="flex max-w-xl animate-pulse flex-col items-start justify-between px-5"
    >
      {/* Meta Info */}
      <div className="flex items-center gap-x-4 text-xs mb-4">
        <div className="h-4 w-20 bg-gray-100 rounded" />
        <div className="h-4 w-16 bg-gray-100 rounded" />
      </div>

      {/* Thumbnail Placeholder */}
      <div className="w-full mt-4">
        <div className="w-full h-48 bg-gray-100 rounded-2xl shadow-md" />
      </div>

      {/* Title & Description */}
      <div className="mt-5 w-full">
        <div className="h-6 w-3/4 bg-gray-100 rounded mb-2" />
        <div className="h-4 w-full bg-gray-100 rounded mb-1" />
        <div className="h-4 w-5/6 bg-gray-100 rounded mb-1" />
        <div className="h-4 w-4/6 bg-gray-100 rounded" />
      </div>

      {/* Author Info */}
      <div className="relative mt-8 flex items-center gap-x-4">
        <div className="size-10 rounded-full bg-gray-100" />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-100 rounded" />
          <div className="h-3 w-16 bg-gray-100 rounded" />
        </div>
      </div>
    </article>
  );
};

const BlogPosts = () => {
  const [posts, setPosts] = useState<TYPaginate<TYBlogPost> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await callApi<TYPaginate<TYBlogPost>>({
          endpoint: "blogs/",
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
  }, []);

  return (
    <Container>
      <section className="animate-onscroll">
        <h1 className="font-black text-2xl pb-2">The Blogs</h1>
        <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-6"></span>
        <p className="text-lg/8 text-gray-600 max-w-4xl">
          Here, you’ll find a collection of articles, stories, and insights that
          inspire, inform, and engage. From the latest updates to helpful tips
          and inspiring stories,
        </p>
      </section>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 mt-10">
        {loading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <article
              key={`skeleton-${i}`}
              className="flex max-w-xl animate-pulse flex-col items-start justify-between px-5"
            >
              {/* Meta Info */}
              <div className="flex items-center gap-x-4 text-xs mb-4">
                <div className="h-4 w-20 bg-gray-100 rounded" />
                <div className="h-4 w-16 bg-gray-100 rounded" />
              </div>

              {/* Thumbnail Placeholder */}
              <div className="w-full mt-4">
                <div className="w-full h-48 bg-gray-100 rounded-2xl shadow-md" />
              </div>

              {/* Title & Description */}
              <div className="mt-5 w-full">
                <div className="h-6 w-3/4 bg-gray-100 rounded mb-2" />
                <div className="h-4 w-full bg-gray-100 rounded mb-1" />
                <div className="h-4 w-5/6 bg-gray-100 rounded mb-1" />
                <div className="h-4 w-4/6 bg-gray-100 rounded" />
              </div>

              {/* Author Info */}
              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="size-10 rounded-full bg-gray-100" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-100 rounded" />
                  <div className="h-3 w-16 bg-gray-100 rounded" />
                </div>
              </div>
            </article>
          ))
        ) : posts && posts.results && posts?.results.length ? (
          posts?.results.map((post) => <BlogPost {...post} key={post.slug} />)
        ) : (
          <div className="w-full h-fit pt-10 flex items-center justify-center flex-col">
            <h1 className="font-black text-2xl pb-2">No Blogs...</h1>

            <div className="flex items-center flex-wrap">
              <img src={notFoundImg} className="w-24 h-24" alt="" />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default BlogPosts;
