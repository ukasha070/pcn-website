import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import Container from "./Container";
import { callApi } from "@/lib/callApi";
import { zodResolver } from "@hookform/resolvers/zod";

import { subscribeFormSchema, subscribeFormData } from "@/lib/schemas";
import SpinnerLoader from "./SpinnerLoader";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number>(2025);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<subscribeFormData>({
    resolver: zodResolver(subscribeFormSchema),
  });

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  async function onSubmit(data: subscribeFormData) {
    try {
      const response = await callApi({
        endpoint: "newsletter/subscribe/",
        method: "POST",
        body: data,
      });

      if (response.id) {
        toast.success("Success added to newsletter.");
      }

      reset({
        email: "",
      });
    } catch (err: any) {
      if (err.data?.email) {
        setError("email", { message: err.data?.email[0] });
      }
      toast.success("Already in the newsletter.");
    }
  }

  return (
    <Container>
      <aside
        className="animate-onscroll"
        aria-label="Subscribe to the Prosfygas Christian Newsletter"
      >
        <h1 className="font-black text-2xl pb-2">Newsletter</h1>
        <span className="w-[4rem] rounded-full h-[.2rem] bg-primary block mb-10"></span>

        <p className="text-lg max-w-4xl">
          Stay connected with a community of faith and purpose. By subscribing
          to our newsletter, you’ll receive uplifting stories, updates on our
          mission work, and opportunities to make a real difference. Let’s walk
          together in love, hope, and service.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-5 max-w-2xl"
          method="post"
        >
          <div className="border p-2 w-full flex items-center rounded-full space-x-2">
            <input
              placeholder="Your Email"
              {...register("email", { required: "Full name is required" })}
              type="email"
              className="h-12 w-full bg-transparent outline-none ring-0 focus:outline-transparent pl-4 focus:ring-0"
            />

            <button
              type="submit"
              className={`h-12 w-fit px-5 bg-primary rounded-full flex items-center space-x p-0 m-0 ${
                isSubmitting ? "cursor-progress" : "cursor-pointer"
              }`}
            >
              {isSubmitting && <SpinnerLoader className="h-5" />}
              <h4 className="text-neutral-400">Subscribe</h4>
            </button>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm pl-4 pt-2">
              {errors.email.message}
            </p>
          )}
        </form>

        <div className="text-sm font-medium text-primary/70 flex flex-col md:flex-row md:items-center">
          <span>All rights reserved. &copy; {currentYear} </span>
          <h5 className="pt-2 sm:pt-0 sm:pl-2">Prosfyges Christian Network</h5>
        </div>
      </aside>
    </Container>
  );
};

export default Footer;
