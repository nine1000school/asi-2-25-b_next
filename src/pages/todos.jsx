import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import axios from "axios"
import clsx from "clsx"
import { Formik } from "formik"
import Link from "next/link"
import { useState } from "react"
import * as yup from "yup"

export const getServerSideProps = async () => {
  const { data: todos } = await axios("http://localhost:3000/api/todos")

  return {
    props: {
      todos,
    },
  }
}
const initialValues = {
  description: "",
  category: "Todo",
}
const validationSchema = yup.object({
  description: yup.string().min(3).required(),
  category: yup.string().min(1).required(),
})
// eslint-disable-next-line max-lines-per-function
const TodosPage = (props) => {
  const { todos: initialTodos } = props
  const [todos, setTodos] = useState(initialTodos)
  const submit = async ({ description, category }, { resetForm }) => {
    const { data: newTodo } = await axios.post("/api/todos", {
      description,
      category,
    })
    setTodos([newTodo, ...todos])
    resetForm()
  }
  const toggleTodo = (todo) => async () => {
    const { data: updatedTodo } = await axios.patch(`/api/todos/${todo._id}`, {
      isDone: !todo.isDone,
    })

    setTodos((currentTodos) => {
      const updatedTodoIndex = currentTodos.findIndex(
        ({ _id }) => _id === todo._id,
      )

      return currentTodos.with(updatedTodoIndex, updatedTodo)
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={submit}
      >
        <Form>
          <FormField name="description" placeholder="Description" />
          <FormField name="category" placeholder="Category" />
          <Button type="submit">ADD</Button>
        </Form>
      </Formik>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-3 bg-stone-200" />
            <th className="p-3 bg-stone-200">Description</th>
            <th className="p-3 bg-stone-200">Category</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index} className="even:bg-stone-100">
              <td className="p-3">
                <button
                  onClick={toggleTodo(todo)}
                  className={clsx(
                    "border w-4 h-4 border-stone-400",
                    todo.isDone && "bg-stone-400",
                  )}
                  data-todo-id={todo._id}
                />
              </td>
              <td className="p-3">
                <Link href={`/todos/${todo._id}/edit`}>{todo.description}</Link>
              </td>
              <td className="p-3">{todo.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodosPage
