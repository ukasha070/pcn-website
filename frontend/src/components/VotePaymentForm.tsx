import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { callApi } from "@/lib/callApi";
import { TYCandidate } from "@/lib/types";
import SpinnerLoader from "./SpinnerLoader";
import { PROCEED_PAYMENT_URL } from "@/lib/constants";
import { PaymentFormSchema, PaymentFormData } from "@/lib/schemas";

type props = {
  candidates: TYCandidate[];
  currentCandidate: TYCandidate | undefined;
  changeCandidate: (changeCandidate: string) => void;
};

const VotePaymentForm: React.FC<props> = ({
  candidates,
  changeCandidate,
  currentCandidate,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      candidate: currentCandidate?.slug,
      currency: "UGX",
    },
  });

  // contine to pay to money
  function proccedToPayment(OrderTrackingId: string) {
    const apiUrl = `${PROCEED_PAYMENT_URL}?OrderTrackingId=${OrderTrackingId}`;
    window.location.href = apiUrl;
  }

  // submit order
  async function onSubmit(data: PaymentFormData) {
    try {
      const response = await callApi<PaymentFormData>({
        endpoint: `payments/initialise-vote/`,
        method: "POST",
        body: data,
      });

      console.log(data);

      if (response) {
        proccedToPayment(
          response["order_tracking_id"] ? response["order_tracking_id"] : ""
        );
      }
    } catch (error) {
      setError("root", { message: "Please make sure you have valid input." });
      console.log("Error happened: ", error);
    }
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        {/* Candidate */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-accent-foreground text-xs font-bold mb-2"
              htmlFor="candidate-input"
            >
              Candidate
            </label>
            <select
              id="candidate-input"
              {...register("candidate")}
              onChange={(e) => {
                changeCandidate(e.target.value);
              }}
              className="appearance-none block w-full bg-accent text-accent-foreground border border-accent rounded py-3 px-4 leading-tight focus:outline-none focus:bg-primary-foreground focus:border-primary/60"
            >
              <option value={0}>--- select candidate</option>
              {candidates?.map((candidate) => (
                <option key={`Op_${candidate.slug}`} value={candidate.slug}>
                  {candidate.full_name}
                </option>
              ))}
            </select>
            {errors.candidate && (
              <p className="text-sm text-red-500 p-1">
                {errors.candidate.message}
              </p>
            )}
          </div>
        </div>

        {/* Full Name and Phone */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-accent-foreground text-xs font-bold mb-2"
              htmlFor="full_name-input"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full_name-input"
              {...register("full_name")}
              placeholder="Your full name"
              className={`appearance-none block w-full bg-accent text-accent-foreground border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-primary-foreground`}
            />
            {errors.full_name && (
              <p className="text-sm text-red-500 p-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-accent-foreground text-xs font-bold mb-2"
              htmlFor="phone_number-input"
            >
              Phone No
            </label>
            <input
              type="number"
              id="phone_number-input"
              {...register("phone_number")}
              placeholder="0703930423"
              className="appearance-none block w-full bg-accent text-accent-foreground border border-accent rounded py-3 px-4 leading-tight focus:outline-none focus:bg-primary-foreground focus:border-primary/60"
            />
          </div>
          {errors.phone_number && (
            <p className="text-sm text-red-500 p-1">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        {/* Currency and Amount */}
        {/* <div className="flex items-cener -mx-3 mb-6">
          <div className="w-1/4 px-3">
            <label
              className="block uppercase tracking-wide text-accent-foreground text-xs font-bold mb-2"
              htmlFor="currency"
            >
              Votes
            </label>
          </div>

          <h3 className="w-3/4 px-3 m-0">
            {PaymentFormSchema?.amount >= 1000 ? formData.amount / 1000 : "0"}
          </h3>
        </div> */}

        <div className="flex -mx-3 mb-6">
          <div className="w-1/4 px-3">
            <label
              className="block uppercase tracking-wide text-accent-foreground text-xs font-bold mb-2"
              htmlFor="currency-input"
            >
              Currency
            </label>
            <select
              id="currency-input"
              required
              {...register("currency")}
              className="appearance-none block w-full bg-accent text-accent-foreground border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-primary-foreground"
            >
              <option value="UGX">UGX</option>
            </select>
            {errors.currency && (
              <p className="text-sm text-red-500 p-1">
                {errors.currency.message}
              </p>
            )}
          </div>

          <div className="w-3/4 px-3">
            <label
              className="block uppercase tracking-wide text-accent-foreground text-xs font-bold mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              type="number"
              required
              {...register("amount")}
              placeholder="1000"
              className="appearance-none block w-full bg-accent text-accent-foreground border border-accent rounded py-3 px-4 leading-tight focus:outline-none focus:bg-primary-foreground focus:border-primary/60"
            />
            {errors.amount && (
              <p className="text-sm text-red-500 p-1">
                {errors.amount.message}
              </p>
            )}

            {/* <p
              className={`text-xs mb-2 ${
                validateAmount(formData.amount)
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Note that allowed amount is that which is multiple of 1000, eg:
              1000, 2000,
            </p>
            <p
              className={`text-xs mb-2 ${
                validateAmount(formData.amount)
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              UGX 1500, 2,500 is not allowed UGX 1000 /=
            </p> */}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-accent-foreground text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              required
              {...register("email")}
              placeholder="prosgfyges@gmail.com"
              className="appearance-none block w-full bg-accent text-accent-foreground border border-accent rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-primary-foreground focus:border-primary/60"
            />
            <p className="text-gray-600 text-xs italic">
              You will receive an email confirmation.
            </p>

            {errors.email && (
              <p className="text-sm text-red-500 p-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Country */}
        <div className="-mx-3 mb-2">
          <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-accent-foreground text-xs font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>

            <select
              {...register("country")}
              id=""
              className="appearance-none block w-full bg-accent text-accent-foreground border border-accent rounded py-3 px-4 leading-tight focus:outline-none focus:bg-primary-foreground focus:border-primary/60"
            >
              <option value="">---select Country</option>
              <option value="Uganda">Uganda</option>
              <option value="Kenya">Kenya</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Malawi">Malawi</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
            </select>
          </div>
          <p className="text-xs pl-3 py-1">
            Here this will help you pay from mobile money.
          </p>
          <p className="text-xs pl-3 py-1">
            If you are paying with bank then leave it to Uganda
          </p>
          {errors.country && (
            <p className="text-sm text-red-500 p-1">{errors.country.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-wrap -mx-3 mt-10">
          <button
            type="submit"
            className={`appearance-none block w-full bg-primary text-accent border p-4 leading-tight focus:outline-none cursor-pointer hover:bg-transparent hover:text-primary duration-300 rounded-md ${
              isSubmitting ? "cursor-progress" : "cursor-pointer"
            }`}
          >
            {isSubmitting && <SpinnerLoader className="h-5 w-5" />}
            <p className="text-current">Proceed to payment</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default VotePaymentForm;
