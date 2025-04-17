import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { marked } from "marked";
import { Helmet } from "react-helmet";
import { Link as SrcollLink } from "react-scroll";

import { notFoundImg } from "@/assets";
import { TYBlogPost } from "@/lib/types";
import { formatDateToISOString } from "@/lib/utils";

import Navbar from "@/components/Navbar";
import Comments from "@/components/Comments";
import Container from "@/components/Container";
import { callApi } from "@/lib/callApi";

const BlogDetailPage = () => {
  const { blogSlug } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<TYBlogPost | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    if (!blogSlug) return;

    async function fetchBlog() {
      try {
        const response = await callApi<TYBlogPost>({
          endpoint: `blogs/${blogSlug}/`,
        });

        setPost(response);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);

        if (error.status) {
          console.log("Status code:", error.status);
        }
      }
    }

    fetchBlog();
  }, [blogSlug]);

  useEffect(() => {
    if (!post?.content_html) return;

    const generateHtml = async () => {
      const html = await marked(post?.content_html as string);
      setHtmlContent(html);
    };

    generateHtml();
  }, [post]);

  return (
    <>
      <Helmet>
        <title>{`Blog | ${post?.title}`}</title>
        <meta
          name="description"
          content="Read impactful stories and updates from Prosfygas Christian Network."
        />
        <link
          rel="canonical"
          href="https://www.prosfyges-christian-network.org/blogs"
        />
      </Helmet>
      <Navbar />
      <Container>
        {loading ? (
          <div role="status" className="max-w-2xl animate-pulse">
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>

            {/* Blog Thumbnail Skeleton */}
            <div className="mt-6">
              <div className="w-full h-72 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Blog Content Skeleton */}
            <div className="space-y-4 mt-8">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="mt-10 space-y-6">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Comments Section Skeleton */}
            <div className="mt-10 space-y-6">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ) : !loading && !post ? (
          <div className="w-full h-fit pt-10">
            <h1 className="font-black text-2xl pb-2">Blog was not Found</h1>
            <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-5"></span>

            <div className="flex items-start flex-col flex-wrap">
              <img src={notFoundImg} className="w-24 h-24" alt="" />
              <p>Make sure you have a valid url.</p>
            </div>
          </div>
        ) : (
          <section>
            <h2 className="text-4xl font-semibold tracking-tight text-pretty sm:text-5xl capitalize mb-2">
              {post?.title}
            </h2>
            <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-10" />

            <p className="block mt-5">{post?.description}</p>

            <div className="h-16">
              <div className="flex flex-wrap items-center gap-x-4 text-sm">
                <time dateTime={post?.created_at} className="text-gray-500">
                  {formatDateToISOString(post?.created_at || "")}
                </time>

                <SrcollLink
                  to="comment-wrapper"
                  smooth={true}
                  duration={500}
                  className="h-10 w-fit px-4 border rounded-full flex items-center hover:text-primary-foreground cursor-pointer hover:bg-primary duration-300 ease-in"
                >
                  <span>Comments</span>
                </SrcollLink>

                {post?.tags?.map((tag) => (
                  <p
                    key={tag.slug}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {tag.name}
                  </p>
                ))}
              </div>
            </div>

            <div className="my-5">
              <div className="flex flex-wrap items-center gap-x-4 text-sm">
                <img
                  alt={post?.author.name}
                  src={post?.author.profile_picture}
                  className="size-10 rounded-full bg-gray-50"
                />
                <h4 className="font-semibold text-gray-900 capitalize text-lg">
                  <span className="" />
                  {post?.author.name}
                </h4>
                <p className="text-gray-600">{post?.author.role}</p>
              </div>
            </div>

            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            <div id="comment-wrapper">
              <Comments blogSlug={blogSlug} />
            </div>
          </section>
        )}
      </Container>
    </>
  );
};

export default BlogDetailPage;
