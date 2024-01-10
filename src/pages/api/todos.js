import { readDatabase } from "@/database/readDatabase"
import { writeDatabase } from "@/database/writeDatabase"

const handler = async (req, res) => {
  // GET /todos -> read resource collection
  if (req.method === "GET") {
    const { category } = req.query
    const { todos } = await readDatabase()
    const result = Object.values(todos)

    res.send(
      (category
        ? result.filter((todo) => todo.category === category)
        : result
      ).toReversed(),
    )

    return
  }

  // POST /todos -> create resource
  if (req.method === "POST") {
    const db = await readDatabase()
    const newLastId = db.lastId + 1
    const { description, category } = req.body
    const newTodo = {
      id: newLastId,
      description,
      category,
    }
    const newDatabase = {
      ...db,
      lastId: newLastId,
      todos: {
        ...db.todos,
        [newLastId]: newTodo,
      },
    }

    await writeDatabase(newDatabase)

    res.send(newTodo)
  }
}

export default handler
