// books.ts
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json("list books"));
app.post("/", (c) => c.json("create a book", 201));
app.get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

app.get("/:id/comment/:comment_id", async (c) => {
  const { id, comment_id } = c.req.param();
  return c.json(`book_id: ${id} comment_id: ${comment_id}`);
});

export default app;
