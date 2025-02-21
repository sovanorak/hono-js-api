import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().max(50),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message:
        "Minimum eight characters, at least one letter, one number and one special character",
    }),
});
