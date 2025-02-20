import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { schema } from "../schemas";

const app = new Hono();

app.post("/", zValidator("json", schema), async (c) => {
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
  //sign token
  const token = await sign(payload, Bun.env.JWT_SECRET || "");
  //store cookie
  setCookie(c, "token", token);
  return c.json({
    payload,
    token,
  });
});

export default app;
