import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { schema } from "../schemas";
import { AuthController } from "../controllers/auth-controller";

const app = new Hono();

app.use(logger());

app.post("/login", zValidator("json", schema), async (c) => AuthController(c));

export default app;
