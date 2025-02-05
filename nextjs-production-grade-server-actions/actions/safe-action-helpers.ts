import { DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

// Zod
export const VALIDATION_ERROR_MESSAGE =
  "An error occurred validating your input.";

// Prisma
export const DATABASE_ERROR_MESSAGE = "An error occurred with our database.";

// Generic error handler for actions that toasts an error message
export const onActionError: NonNullable<
  Parameters<typeof useAction>[1]
>["onError"] = ({ error, input }) => {
  if (error.validationErrors) {
    toast.error(VALIDATION_ERROR_MESSAGE);
  } else if (error.serverError && typeof error.serverError === "string") {
    toast.error(error.serverError);
  } else {
    toast.error(DEFAULT_SERVER_ERROR_MESSAGE);
  }
};
