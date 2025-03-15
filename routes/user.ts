import { Hono } from "hono";

import { Prisma, PrismaClient } from "@prisma/client";
import { zValidator } from "@hono/zod-validator";
import { UserSchema } from "../schemas";
import * as bcrypt from "bcryptjs";

const app = new Hono();
const prisma = new PrismaClient();

//Create user
app.post("/", zValidator("json", UserSchema), async (c) => {
  try {
    const { email, name, password } = c.req.valid("json");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return c.json({ user });
  } catch (error) {
    return c.json({ error: "Failed to create user" }, 500);
  }
});

//Find all users
app.get("/", async (c) => {
  try {
    const page = parseInt(c.req.query("page") || "1", 10);
    const limit = parseInt(c.req.query("limit") || "10", 10);
    const name = c.req.query("name");
    const email = c.req.query("email");

    const pagination = {
      skip: (page - 1) * limit,
      take: limit,
    };

    const where: Prisma.UserWhereInput = {};
    if (name) where.name = { contains: name };
    if (email) where.email = { contains: email };

    const [data, count] = await prisma.$transaction([
      prisma.user.findMany({ where, ...pagination }),
      prisma.user.count({ where, ...pagination }),
    ]);

    return c.json({ data, count });
  } catch (error) {
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

export default app;
