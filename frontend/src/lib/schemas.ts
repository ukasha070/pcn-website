import { z } from "zod";

export const PaymentFormSchema = z.object({
  candidate: z.string().min(1, "Candidate is required"),
  full_name: z.string().min(1, "Full Name is required"),
  phone_number: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  currency: z.enum(["UGX"], { required_error: "Currency is required" }),
  amount: z.coerce.number().min(100, "Amount must be at least 1000"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  country: z.string().min(1, "Country is required"),
  order_tracking_id: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof PaymentFormSchema>;

export const subscribeFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});
export type subscribeFormData = z.infer<typeof subscribeFormSchema>;

export const contactFormSchema = z.object({
  sender_name: z
    .string()
    .min(4, "4 characters need maximum.")
    .max(50, "Max of 50 characters needed.")
    .transform((value) => value.trim()),
  sender_email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Atleast 10 characters")
    .max(500, "500 characters needed maximum.")
    .transform((value) => value.trim()),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const commentFormSchema = z.object({
  full_name: z
    .string()
    .min(4, "4 characters need maximum.")
    .max(50, "Max of 50 characters needed.")
    .transform((value) => value.trim()),
  user_email: z.string().email("Invalid email address"),
  comment_msg: z
    .string()
    .min(10, "Atleast 10 characters")
    .max(500, "500 characters needed maximum.")
    .transform((value) => value.trim()),
});

export type commentFormData = z.infer<typeof commentFormSchema>;

// .refine((val) => Number(val) % 1000 === 0, {
//   message: "Amount must be a multiple of 1000",
// })
