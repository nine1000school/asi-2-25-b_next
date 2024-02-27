import axios from "axios"
import chalk from "chalk"

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
})
const printTodo = ({ _id, description, category }) =>
  // eslint-disable-next-line no-console
  console.log(`${chalk.bgBlue(_id)} ${description} ${chalk.bgWhite(category)}`)
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
  toggle: async () => {},
}
const command = commands[commandName]

if (!command) {
  // eslint-disable-next-line no-console
  console.error(`todo: No such command "${commandName}"`)
  process.exit(1)
}

command(...args)
