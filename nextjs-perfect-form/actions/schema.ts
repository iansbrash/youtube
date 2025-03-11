import { z } from "zod";

export const nameSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const combinedFormSchema = z.object({
  // Basic info
  name: z.string().min(1, "Name is required"),
  title: z.enum(["mr", "mrs", "ms", "dr", "prof"], {
    required_error: "Please select a title",
  }),

  // Preferences
  notificationPreference: z
    .enum(["email", "sms", "push"], {
      required_error: "Please select a notification preference",
    })
    .refine((value) => value !== "push", {
      message: "Push Notifications are not supported yet.",
    }),
  marketingEmails: z.boolean().default(false),
  isPublicProfile: z.boolean().default(false),

  // Important dates
  birthDate: z.date({
    required_error: "Please select a birth date",
  }),

  // Numeric preferences
  experienceLevel: z
    .number()
    .min(10, "Experience level must be at least 10%")
    .max(100)
    .default(50),
});
