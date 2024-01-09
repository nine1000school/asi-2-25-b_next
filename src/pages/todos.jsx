import { readDatabase } from "@/database/readDatabase"

export const getServerSideProps = async () => {
  const todos = await readDatabase()

  return {
    props: {
      todos,
    },
  }
}
const TodosPage = (props) => {
  const { todos } = props

  return (
    <ul className="p-8">
      {todos.map((todo, index) => (
        <li key={index}>- {todo}</li>
      ))}
    </ul>
  )
}

export default TodosPage
