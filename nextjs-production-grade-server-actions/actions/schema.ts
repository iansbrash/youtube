// Put all zod schemas here for Server Actions
// That way, we can consume them both server-side for input parsing
import { z } from "zod";

export const switchOrganizationSchema = z.object({
  organizationId: z.string(),
});
