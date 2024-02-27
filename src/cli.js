import axios from "axios"
import chalk from "chalk"

const noop = (x) => x
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
})
const printTodo = ({ _id, description, category, isDone }) =>
  // eslint-disable-next-line no-console
  console.log(
    `${chalk.bgBlue(_id)} ${(isDone ? chalk.strikethrough : noop)(
      description,
    )} ${chalk.bgWhite(category)}`,
  )
const [commandName, ...args] = process.argv.slice(2)
const commands = {
  add: async (description, category) => {
    const { data: todo } = await apiClient.post("/todos", {
      description,
      category,
    })

    printTodo(todo)
  },
  delete: async (id) => {
    const { data: todo } = await apiClient.delete(`/todos/${id}`)

    printTodo(todo)
  },
  list: async () => {
    const { data: todos } = await apiClient("/todos")

    todos.forEach(printTodo)
  },
  edit: async (id, description, category) => {
    const { data: todo } = await apiClient.patch(`/todos/${id}`, {
      description,
      category,
    })

    printTodo(todo)
  },
  toggle: async (id) => {
    const { data: todo } = await apiClient(`/todos/${id}`)
    const { data: updatedTodo } = await apiClient.patch(`/todos/${id}`, {
      isDone: !todo.isDone,
    })

    printTodo(updatedTodo)
  },
}
const command = commands[commandName]

if (!command) {
  // eslint-disable-next-line no-console
  console.error(`todo: No such command "${commandName}"`)
  process.exit(1)
}

command(...args)
