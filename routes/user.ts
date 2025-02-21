import { Hono } from "hono";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { zValidator } from "@hono/zod-validator";
import { UserSchema } from "../schemas";

const app = new Hono();
const prisma = new PrismaClient();

app.post("/", zValidator("json", UserSchema), async (c) => {
  const { email, name, password } = c.req.valid("json");
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });
  return c.json({ user });
});

export default app;
