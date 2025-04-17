import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Container, SpinnerLoader } from ".";

import { callApi } from "@/lib/callApi";
import { contactFormSchema, ContactFormData } from "@/lib/schemas";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    console.log(data);

    try {
      const response = await callApi({
        endpoint: "contact/",
        method: "POST",
        body: data,
      });

      if (response.sender_name) {
        toast.success("Your Message was sent successfully.");
      }
    } catch (err: any) {
      if (err.data.sender_email) {
        setError("sender_email", { message: err.data.sender_email[0] });
      }
      if (err.data.sender_name) {
        setError("sender_name", { message: err.data.sender_name[0] });
      }
      if (err.data.message) {
        setError("message", { message: err.data.message[0] });
      }

      toast.error("Email not Sent.");
    }
  }

  return (
    <Container className="py-0 my-0">
      <section className="my-10">
        <h2 className="text-2xl font-semibold tracking-tight text-pretty">
          Get in touch
        </h2>
        <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-10"></span>

        <p className="text-lg max-w-4xl">
          Whether you have questions, ideas, partnerships, or just want to say
          hello—your voice matters to us. Reach out and let’s build something
          meaningful together.
        </p>
      </section>

      <section className="text-gray-600 relative animate-onscroll">
        <div className="container pb-24 mx-auto flex flex-col md:flex-row">
          {/* [[[[ MAP ]]]] */}
          <section className="lg:w-2/3 md:full bg-accent rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              frameBorder="0"
              title="map"
              scrolling="no"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.775657796405!2d32.593177375682544!3d0.2649627641007427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbdd378a631d9%3A0x8b4bc7e10a740ff!2sProsfygas%20Christian%20Network!5e0!3m2!1sen!2sug!4v1744020532810!5m2!1sen!2sug"
            ></iframe>
            <div className="bg-primary-foreground relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="text-base font-semibold text-gray-900 tracking-widest">
                  ADDRESS
                </h2>
                <Link
                  to="https://www.google.com/maps?ll=0.264957,32.595752&z=17&t=m&hl=en&gl=UG&mapclient=embed&cid=627333497742639359"
                  target="_blank"
                  className="mt-1 text-orange-500"
                >
                  Uganda kampala Salam Road Calender Junction
                </Link>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="text-base font-semibold text-gray-900 tracking-widest">
                  EMAIL
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="cursor-pointer">
                      <Link
                        to="mailTo:prosfygas.christian.network@gmail.com"
                        target="_blank"
                        className="text-orange-500"
                      >
                        Email Us here{" "}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>prosfygas.christian.network@gmail.com</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <h2 className="text-base font-semibold text-gray-900 tracking-widest mt-4">
                  PHONE
                </h2>
                <Link
                  to="tel:+256 767 990 709"
                  className="leading-relaxed text-orange-500"
                >
                  +256 767 990 709
                </Link>
              </div>
            </div>
          </section>

          {/* //// FORM //// */}
          <section className="lg:w-1/3 md:w-full flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 animate-onscroll">
            <h2 className="text-primary mb-1 font-medium title-font text-xl">
              Feedback
            </h2>
            <p className="leading-relaxed text-primary/70 text-base">
              Your feedback helps us improve and serve you better. If you have
              any suggestions or comments, please share them using the form
              below.
            </p>

            {/* ///////// FORM /////////// */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className="w-full mb-5"
            >
              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  {...register("sender_name")}
                  className="w-full bg-primary-foreground rounded border border-accent text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.sender_name && (
                  <p className="text-red-500 text-sm">
                    {errors.sender_name?.message}
                  </p>
                )}
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("sender_email")}
                  className="w-full bg-primary-foreground rounded border border-accent text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.sender_email && (
                  <p className="text-red-500 text-sm">
                    {errors.sender_email?.message}
                  </p>
                )}
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  {...register("message")}
                  className="w-full bg-primary-foreground rounded border border-accent h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
                {errors.message && (
                  <>
                    <p className="text-red-500 text-sm">
                      {errors.message?.message}
                    </p>
                  </>
                )}
              </div>

              <button
                type="submit"
                className={`py-3 px-6 text-base border border-primary rounded-full flex items-center space-x-2 ${
                  isSubmitting ? "cursor-progress" : "cursor-pointer"
                }`}
              >
                {isSubmitting && <SpinnerLoader className="h-5 w-5" />}
                <h4>Send Message</h4>
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-3">
              We will get back to you within 24 hours.
            </p>
          </section>
        </div>
      </section>
    </Container>
  );
};

export default ContactUs;
