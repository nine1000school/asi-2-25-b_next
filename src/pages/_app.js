import "@/styles/globals.css"
import Link from "next/link"

const App = ({ Component, pageProps }) => (
  <main className="flex flex-col">
    <header className="flex justify-center bg-slate-100 border-b border-b-slate-200">
      <div className="max-w-md p-4">
        <Link href="/">TODOS</Link>
      </div>
    </header>
    <section className="flex justify-center">
      <div className="max-w-md w-full p-4">
        <Component {...pageProps} />
      </div>
    </section>
  </main>
)

export default App
