import { Hono } from "hono";
import { logger } from "hono/logger";
import auth from "../routes/auth";
import book from "../routes/book";

const app = new Hono();
app.use(logger());

//Routes
app.route("/login", auth);
app.route("/books", book);

export default app;
