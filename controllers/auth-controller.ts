import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";

export const AuthController = async (c: Context) => {
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

  console.log(Date.now());

  const token = await sign(payload, Bun.env.JWT_SECRET || "");

  //store cookie
  setCookie(c, "token", token);

  return c.json({
    payload,
    token,
  });
};
