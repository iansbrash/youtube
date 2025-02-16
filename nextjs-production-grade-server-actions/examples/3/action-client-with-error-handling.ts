import {
  DATABASE_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from "@/actions/safe-action-helpers";
import { Prisma } from "@prisma/client";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { ZodError } from "zod";

export const actionClientWithErrorHandling = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof ZodError) {
      console.error(e.message);
      return VALIDATION_ERROR_MESSAGE;
    } else if (e instanceof Error) {
      if (
        e instanceof Prisma.PrismaClientInitializationError ||
        e instanceof Prisma.PrismaClientKnownRequestError ||
        e instanceof Prisma.PrismaClientUnknownRequestError ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        console.error(e.message);
        return DATABASE_ERROR_MESSAGE;
      } else return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});
