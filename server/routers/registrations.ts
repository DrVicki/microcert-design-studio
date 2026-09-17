import { z } from "zod";
import { getRegistrationStats, listRegistrations, saveRegistration } from "../db";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";

const registrationInput = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320).transform(value => value.toLowerCase()),
  roleUnit: z.string().trim().min(2).max(220),
  consent: z.literal(true),
});

export const registrationsRouter = router({
  save: publicProcedure
    .input(registrationInput)
    .mutation(async ({ input }) => {
      const saved = await saveRegistration({
        name: input.name,
        email: input.email,
        roleUnit: input.roleUnit,
        consentAcceptedAt: new Date(),
      });

      if (!saved) throw new Error("Registration could not be saved");
      return {
        id: saved.id,
        name: saved.name,
        email: saved.email,
        roleUnit: saved.roleUnit,
        registeredAt: saved.registeredAt,
        updatedAt: saved.updatedAt,
      };
    }),

  list: adminProcedure.query(() => listRegistrations()),
  stats: adminProcedure.query(() => getRegistrationStats()),
});
