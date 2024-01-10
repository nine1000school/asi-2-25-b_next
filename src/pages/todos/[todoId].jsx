export const getServerSideProps = ({ params: { todoId } }) => ({
  props: { todoId },
})
const TodoPage = (props) => {
  const { todoId } = props

  return <h1 className="text-2xl">#{todoId}</h1>
}

export default TodoPage
