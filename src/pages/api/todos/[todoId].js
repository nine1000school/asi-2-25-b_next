import { readDatabase } from "@/database/readDatabase"
import { writeDatabase } from "@/database/writeDatabase"

const handler = async (req, res) => {
  const { todoId } = req.query
  const db = await readDatabase()
  const todo = db.todos[todoId]

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
    const { description } = req.body
    const newTodo = { ...todo, description }

    await writeDatabase({
      ...db,
      todos: {
        ...db.todos,
        [todoId]: newTodo,
      },
    })

    res.send(newTodo)

    return
  }

  // DELETE /todos/[todoId] -> delete resource item
  if (req.method === "DELETE") {
    const {
      // eslint-disable-next-line no-unused-vars
      todos: { [todoId]: _, ...todos },
    } = db

    await writeDatabase({
      ...db,
      todos,
    })

    res.send(todo)
  }
}

export default handler
