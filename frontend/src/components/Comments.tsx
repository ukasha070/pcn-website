// Core Libraries
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { commentFormData, commentFormSchema } from "@/lib/schemas";

// Third-Party Libraries
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { scroller } from "react-scroll";

// Project Utilities and Types
import { getPageNumber, formatDateToISOString } from "@/lib/utils";
import { TYPaginate, TYComment } from "@/lib/types";

// Components
import { Button } from "./ui/button";

// Assets
import { notFoundImg, defaultUserImg } from "@/assets";
import { callApi } from "@/lib/callApi";
import { zodResolver } from "@hookform/resolvers/zod";
import SpinnerLoader from "./SpinnerLoader";

// Skeleton component for loading state
export const CommentSkeleton = () => (
  <article className="p-2 text-base">
    <footer className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <div className="inline-flex items-center mr-3 text-sm dark:text-white font-semibold">
          <div className="mr-2 w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="bg-gray-300 animate-pulse w-24 h-4"></div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <div className="bg-gray-300 animate-pulse w-16 h-4"></div>
        </div>
      </div>
    </footer>
    <div className="text-gray-500 dark:text-gray-400">
      <div className="bg-gray-300 animate-pulse w-full h-4 mb-2"></div>
      <div className="bg-gray-300 animate-pulse w-5/6 h-4 mb-2"></div>
      <div className="bg-gray-300 animate-pulse w-4/6 h-4"></div>
    </div>
    <div className="flex items-center mt-4 space-x-4">
      <button
        type="button"
        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
      >
        <svg
          className="mr-1.5 w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
          />
        </svg>
        <div className="bg-gray-300 animate-pulse w-12 h-4"></div>
      </button>
    </div>
  </article>
);

// Comment component
export const Comment: React.FC<TYComment> = ({ setReply, ...comment }) => (
  <article className="p-2 text-base">
    <footer className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <p className="inline-flex items-center mr-3 text-sm dark:text-white font-semibold">
          <img
            width={100}
            height={100}
            className="mr-2 w-6 h-6 rounded-full"
            src={defaultUserImg}
            alt={comment.full_name}
          />
          {comment.full_name}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <time title={comment.created_at}>
            {formatDateToISOString(comment.created_at)}
          </time>
        </p>
      </div>
    </footer>
    <p className="text-gray-500 dark:text-gray-400">{comment.comment_msg}</p>
    <div className="flex items-center mt-4 space-x-4">
      <button
        type="button"
        onClick={() => {
          setReply({ id: comment.id, content: comment.comment_msg });
          scroller.scrollTo("comment-wrapper", {
            duration: 500,
            delay: 0,
            smooth: "easeInOut",
          });
        }}
        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
      >
        <svg
          className="mr-1.5 w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
          />
        </svg>
        Reply
      </button>
    </div>
  </article>
);

// Main Comments component
interface Props {
  blogSlug: string | undefined;
}

const Comments: React.FC<Props> = ({ blogSlug }) => {
  const [comments, setComments] = useState<TYPaginate<TYComment> | null>(null);

  const [fetchURL, setFetchURL] = useState(`blogs/${blogSlug}/comments/`);
  const [postURL, _] = useState(`blogs/${blogSlug}/comments/create/`);
  const [reply, setReply] = useState<{ content: string; id: number } | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<commentFormData>({
    resolver: zodResolver(commentFormSchema),
  });

  // Handle form submission
  const onSubmit = async (data: commentFormData) => {
    const currentPostURL = reply?.id
      ? `blogs/${blogSlug}/comments/create/?replyID=${reply.id}`
      : postURL;

    try {
      const response = await callApi<TYComment>({
        endpoint: currentPostURL,
        method: "POST",
        body: data,
      });

      toast.success("Your Comment was added.");
      setComments((oldData) =>
        oldData
          ? {
              ...oldData,
              results: [...oldData.results, response],
            }
          : null
      );
      reset({
        comment_msg: "",
        full_name: "",
        user_email: "",
      });
    } catch (error) {
      setError("root", { message: JSON.stringify(error) });
      console.error("Error happened: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments on mount
  useEffect(() => {
    async function fetchComments() {
      setLoading(true);

      try {
        const response = await callApi<TYPaginate<TYComment>>({
          endpoint: fetchURL,
        });

        const pagURL = new URL(fetchURL, window.location.origin);
        const pagURLParams = pagURL.searchParams;
        const pagNum = pagURLParams.get("page");

        if (pagNum) {
          setComments((oldData) => {
            if (!oldData) return null;
            return {
              ...oldData,
              results: [...oldData.results, ...response.results],
              next: response.next,
              previous: response.previous,
            };
          });
        } else {
          setComments(response);
        }
      } catch (error) {
        console.error("Error happened: ", error);
        toast.error("Failed to fetch comments. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [fetchURL]);

  // Handle pagination
  const handlePagination = (action: string) => {
    if (!comments?.previous && !comments?.next) return;
    const pageNum =
      action === "next"
        ? getPageNumber(comments?.next ? comments?.next : "")
        : getPageNumber(comments.previous ? comments.previous : "");

    if (pageNum) {
      setFetchURL(`blogs/${blogSlug}/comments/?page=${pageNum}`);
    } else {
      toast.success("Reached the end of the list.");
    }
  };

  return (
    <section className="pt-10 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl">
          Discussion ({comments?.count || 0})
        </h2>
      </div>

      {reply && (
        <div className="p-2 text-sm flex items-start">
          Reply {reply.id}: {reply.content}
          <button
            type="button"
            onClick={() => setReply(null)}
            className="ml-4 p-1 border rounded-xl hover:bg-primary hover:text-primary-foreground cursor-pointer duration-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="p-4 mb-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <input
            type="text"
            placeholder="Your Name"
            {...register("full_name")}
            className="w-full outline-none py-2 mb-4 border px-2 text-base"
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm py-1">
              {errors.full_name.message}
            </p>
          )}
          <input
            type="text"
            placeholder="Your Email"
            {...register("user_email")}
            className="w-full outline-none py-2 mb-4 border px-2 text-base"
          />
          {errors.user_email && (
            <p className="text-red-500 text-sm py-1">
              {errors.user_email.message}
            </p>
          )}
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            rows={6}
            {...register("comment_msg")}
            className="px-0 w-full text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 text-base"
            placeholder="Write a comment..."
            required
          />
          {errors.comment_msg && (
            <p className="text-red-500 text-sm py-1">
              {errors.comment_msg.message}
            </p>
          )}
        </div>
        {errors.root && (
          <p className="text-red-500 text-sm py-3">{errors.root.message}</p>
        )}
        <Button
          type="submit"
          className="py-7 px-5 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting && <SpinnerLoader className="h-6 w-6" />}
          <span>Post comment</span>
        </Button>
      </form>

      <div className="mt-4 flex flex-col space-y-5">
        {!comments?.results.length ? (
          <div className="w-full h-fit pt-10 flex items-center justify-center flex-col">
            <h1 className="font-black text-2xl pb-2">No Comments Yet.</h1>

            <div className="flex items-center flex-wrap">
              <img
                src={notFoundImg}
                className="w-24 h-24"
                alt="not found image"
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col space-y-5 max-h-[80vh] overflow-y-auto">
              {comments.results.map((comment, i) => (
                <Comment {...comment} setReply={setReply} key={`Co_Sk_${i}`} />
              ))}
            </div>

            {comments.next && (
              <Button
                className="p-6 mt-5"
                onClick={() => handlePagination("next")}
              >
                <span>More</span>
              </Button>
            )}
          </div>
        )}

        {loading &&
          Array.from({ length: 2 }).map((_, i) => (
            <CommentSkeleton key={`Co_Sk_${i}`} />
          ))}
      </div>
    </section>
  );
};

export default Comments;
