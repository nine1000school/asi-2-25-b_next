import { Button } from "@/components/Button"
import { FormField } from "@/components/FormField"
import axios from "axios"
import { Form, Formik } from "formik"
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
          <FormField name="description" placeholder="Description" />
          <FormField name="category" placeholder="Category" />
          <Button type="submit">ADD</Button>
        </Form>
      </Formik>
      <ul className="p-8">
        {todos.map((todo, index) => (
          <li key={index}>
            -{" "}
            <Link href={`/todos/${todo.id}/edit`}>
              #{todo.id} {todo.description} ({todo.category})
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodosPage
