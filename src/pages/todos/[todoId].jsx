import axios from "axios"

export const getServerSideProps = async ({ params: { todoId } }) => {
  const { data: todo } = await axios(
    `http://localhost:3000/api/todos/${todoId}`,
  )

  return {
    props: { todo },
  }
}
const TodoPage = ({ todo }) => (
  <>
    <h1 className="text-2xl">#{todo.id}</h1>
    <p>Description: {todo.description}</p>
    <p>Category: {todo.category}</p>
  </>
)

export default TodoPage
