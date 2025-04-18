import { Navbar } from "@/components";

import { pageNotFoundImg } from "@/assets";
const NotFoundPage = () => {
  return (
    <div>
      <>
        <Navbar />
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <img
                src={pageNotFoundImg}
                alt="page not found image"
                className="w-full h-full"
              />

              <h4 className="my-5 text-2xl">Something's missing.</h4>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, we can't find that page. You'll find lots to explore on
                the home page.{" "}
              </p>
              <a
                href="#"
                className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
              >
                Back to Homepage
              </a>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default NotFoundPage;
