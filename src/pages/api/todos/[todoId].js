import { createRoute } from "@/api/createRoute"
import { TodoModel } from "@/database/models/TodoModel"

const handler = createRoute(async (req, res) => {
  const { todoId } = req.query
  const todo = await TodoModel.findById(todoId)

  if (!todo) {
    res.status(404).send({ error: "not found" })

    return
  }

  // GET /todos/[todoId] -> read resource item
  if (req.method === "GET") {
    res.send(todo)

    return
  }

  // PATCH /todos/[todoId] -> update resource item
  if (req.method === "PATCH") {
    const { description, category } = req.body

    if (description) {
      todo.description = description
    }

    if (category) {
      todo.category = category
    }

    await todo.save()

    res.send(todo)

    return
  }

  // DELETE /todos/[todoId] -> delete resource item
  if (req.method === "DELETE") {
    await todo.deleteOne()

    res.send(todo)
  }
})

export default handler
