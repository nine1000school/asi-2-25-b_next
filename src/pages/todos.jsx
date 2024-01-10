import axios from "axios"
import { Field, Form, Formik } from "formik"
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
const TodosPage = (props) => {
  const { todos: initialTodos } = props
  const [todos, setTodos] = useState(initialTodos)
  const handleSubmit = async ({ description, category }, { resetForm }) => {
    const { data: newTodo } = await axios.post("/api/todos", {
      description,
      category,
    })
    setTodos([newTodo, ...todos])
    resetForm()
  }

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form noValidate className="flex flex-col gap-4">
          <Field
            name="description"
            className="border-2 p-2"
            placeholder="Description"
          />
          <Field
            name="category"
            className="border-2 p-2"
            placeholder="Category"
          />
          <button
            type="submit"
            className="bg-indigo-600 active:bg-indigo-700 text-white px-3 py-2 font-semibold"
          >
            ADD
          </button>
        </Form>
      </Formik>
      <ul className="p-8">
        {todos.map((todo, index) => (
          <li key={index}>
            - #{todo.id} {todo.description} ({todo.category})
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodosPage
