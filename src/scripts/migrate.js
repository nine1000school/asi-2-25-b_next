import { readDatabase } from "../database/readDatabase.js"
import { writeDatabase } from "../database/writeDatabase.js"
;(async () => {
  const db = await readDatabase()
  const todosWithCategory = Object.fromEntries(
    Object.entries(db.todos).map(([todoId, todo]) => [
      todoId,
      {
        ...todo,
        category: "Todo",
      },
    ]),
  )

  await writeDatabase({
    ...db,
    todos: todosWithCategory,
  })
})()
