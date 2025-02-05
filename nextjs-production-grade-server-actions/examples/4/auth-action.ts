"use server";

import { z } from "zod";
import { actionClientWithMeta } from "./action-client-with-meta";
import { authenticationMiddleware } from "@/actions/middleware/authentication.middleware";
import { simpleAuthorizationMiddleware } from "@/actions/middleware/authorization-simple.middleware";

const authMiddlewareExampleSchema = z.object({});

export const authMiddlewareExampleAction = actionClientWithMeta
  .metadata({
    name: "auth-middleware-example-action",
  })
  .use(authenticationMiddleware)
  .use(
    simpleAuthorizationMiddleware({
      plans: ["PRO"],
      roles: "ALL",
    }),
  )
  .schema(authMiddlewareExampleSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { user, session } = ctx;

    // Do some logic. Maybe update the name
    // await prisma.user.update({ ... })

    return user;
  });
