import { readDatabase } from "@/database/readDatabase"
import { writeDatabase } from "@/database/writeDatabase"

const handler = async (req, res) => {
  // GET /todos -> read resource collection
  if (req.method === "GET") {
    const { todos } = await readDatabase()

    res.send(Object.values(todos))

    return
  }

  // POST /todos -> create resource
  if (req.method === "POST") {
    const db = await readDatabase()
    const newLastId = db.lastId + 1
    const newTodo = {
      id: newLastId,
      description: req.body.description,
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
