import { Hono } from "hono";
import { logger } from "hono/logger";
import user from "../routes/user";

const app = new Hono();
app.use(logger());

//Routes
app.route("/user", user);

export default app;
