import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { schema } from "../schemas";
import auth from "../routes/auth";

const app = new Hono();

app.use(logger());

app.route("/login", auth);

export default app;
