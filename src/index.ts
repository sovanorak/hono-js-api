import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";
import { schema } from "../schemas";

const app = new Hono();

app.use(logger());

app.post("/login", zValidator("json", schema), async (c) => {
  const { email, password } = await c.req.json();

  //static password
  if (password !== "norak1234*") {
    throw new HTTPException(401, {
      message: "Invalid credentials",
    });
  }

  //static payload
  const payload = {
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  console.log(payload);

  const token = await sign(payload, Bun.env.JWT_SECRET || "");
  //store cookie
  setCookie(c, "token", token);
  return c.json({
    payload,
    token,
  });
});
export default app;
