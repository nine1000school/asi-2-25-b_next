import { createRoute } from "@/api/createRoute"
import { TodoModel } from "@/database/models/TodoModel"

const handler = createRoute(async (req, res) => {
  // GET /todos -> read resource collection
  if (req.method === "GET") {
    const { category } = req.query
    const todos = await TodoModel.find(category ? { category } : {})

    res.send(todos)

    return
  }

  // POST /todos -> create resource
  if (req.method === "POST") {
    const { description, category } = req.body
    const newTodo = new TodoModel({
      description,
      category,
    })

    await newTodo.save()

    res.send(newTodo)
  }
})

export default handler
