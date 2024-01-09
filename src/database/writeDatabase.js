import { writeFile } from "node:fs/promises"

export const writeDatabase = async (newDatabase) => {
  const json = JSON.stringify(newDatabase)

  await writeFile("./db.json", json, { encoding: "utf-8" })
}
