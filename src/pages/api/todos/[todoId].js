const handler = (req, res) => {
  const todoId = req.query.todoId
  const todo = {} // database.query(todoId)

  if (!todo) {
    res.status(404).send({ error: "not found" })

    return
  }

  // GET /todos/[todoId] -> read resource item
  if (req.method === "GET") {
    //
    res.send(todo)
  }

  // PATCH /todos/[todoId] -> update resource item
  if (req.method === "PATCH") {
    //
    const newTodo = { ...todo }

    res.send(newTodo)
  }

  // DELETE /todos/[todoId] -> delete resource item
  if (req.method === "DELETE") {
    //
    res.send(todo)
  }
}

export default handler
