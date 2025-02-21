import { Hono } from "hono";

import { PrismaClient } from "@prisma/client";
import { zValidator } from "@hono/zod-validator";
import { UserSchema } from "../schemas";
import * as bcrypt from "bcryptjs";

const app = new Hono();
const prisma = new PrismaClient();

app.post("/", zValidator("json", UserSchema), async (c) => {
  const { email, name, password } = c.req.valid("json");
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  return c.json({ user });
});

export default app;
