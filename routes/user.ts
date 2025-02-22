import { Hono } from "hono";

import { PrismaClient } from "@prisma/client";
import { zValidator } from "@hono/zod-validator";
import { UserSchema } from "../schemas";
import * as bcrypt from "bcryptjs";

const app = new Hono();
const prisma = new PrismaClient();

//Create user
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

//Find all users
app.get("/", async (c) => {
  
  const page = Number(c.req.query("page") || 1);
  const limit = Number(c.req.query("limit") || 10);
  const name = (c.req.query("name") as string) || "";

  const defaultPaginate = {
    skip: (page - 1) * limit, 
    take: limit,
  };
  const deafaultWhereCondition = {
    where: {
      name: {
        contains: name,
      },
    },
  };
  const data = await prisma.user.findMany({
    ...deafaultWhereCondition,
    ...defaultPaginate,
  });
  const count = await prisma.user.count({
    ...deafaultWhereCondition,
    ...defaultPaginate,
  });
  return c.json({ data, count });
});

export default app;
