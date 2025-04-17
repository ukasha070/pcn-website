import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";
import { callApi } from "@/lib/callApi";
import { SpinnerLoader } from "@/components";
import { ShieldAlert } from "lucide-react";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [votePayment, setVotePayment] = useState<{
    message: string;
    votes: number;
    event_slug: string;
    candidate_slug: string;
    full_name: string;
  }>({
    message: "Already counted.",
    votes: 30,
    event_slug: "celebrate-jesus",
    candidate_slug: "jon-ukad",
    full_name: "",
  });

  const OrderTrackingId = searchParams.get("OrderTrackingId");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await callApi({
          endpoint: `payments/callback/?OrderTrackingId=${OrderTrackingId}`,
        });

        if (response.status === 404) {
          return;
        }
        if (response.message === "success") {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
        setVotePayment(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error(`Error fetching verifying payment: ${error}`);
      }
    };

    if (OrderTrackingId) {
      verifyPayment();
    }
  }, []);
  return loading ? (
    <>
      <div>
        <ShieldAlert />
      </div>

      <div className="fixed top-0 left-0 h-screen w-screen bg-accent items-center justify-center hidden">
        <div className="w-fit flex flex-col items-center justify-center">
          <SpinnerLoader className="h-10 w-10" />
          <h3 className="mb-2">Verifing Your Payment</h3>
          <span className="mb-2 max-w-xl text-center px-6">
            After verifing your payment we will be able to send a confirmation
            email and votes will be added automaticatically thanks.
          </span>
        </div>
      </div>
    </>
  ) : (
    <div className="flex fixed top-0 left-0 w-full items-center justify-center min-h-screen bg-gradient-to-r from-accent to-yellow-50 dark:from-primary dark:to-primary/90">
      <div className="w-full max-w-2xl p-4 bg-primary-foreground shadow-2xl dark:bg-primary-900 sm:p-10 sm:rounded-3xl">
        <div className="text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full dark:bg-green-700">
            <svg
              className="h-12 w-12 text-green-600 dark:text-green-100"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
            Payment Successful!
          </h1>
          <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
            You voted{" "}
            <Link
              to={`/events/${votePayment.event_slug}/candidates/${votePayment.candidate_slug}/`}
              className="font-chealse"
            >
              {votePayment.full_name}
            </Link>{" "}
            Successfully
          </p>

          <div className="flex items-center justify-center mt-6">
            <p className="text-5xl flex items-center justify-center text-yellow-600 dark:text-yellow-400">
              <span>+</span>
              <h4>{votePayment.votes}</h4>
            </p>{" "}
            <p className="pl-3 font-chealse">Votes</p>
          </div>
          <p>
            {votePayment.message === "success" ? (
              <span className="text-green-500">You voted success</span>
            ) : (
              <span className="text-red-500 max-w-sm">
                You voted failed because you have voted already with the payment
              </span>
            )}
          </p>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
            If you have any questions or need further assistance, feel free to
            contact us at:
            <Link
              to="mailto:admin@eliteai.tools"
              className="font-medium text-orange-600 dark:text-orange-300 underline"
            >
              here
            </Link>
          </p>
        </div>
        <div className="mt-8 text-center">
          <a
            href="http://127.0.0.1:8000"
            className="inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-orange-600 to-yellow-600 hover:scale-105 hover:from-orange-700 hover:to-yellow-700 dark:from-orange-500 dark:to-yellow-500 dark:hover:from-orange-600 dark:hover:to-yellow-600"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Callback;
