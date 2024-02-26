import { todoSchema } from "@/database/schemas/todoSchema"
import mongoose from "mongoose"

export const TodoModel =
  mongoose.models.Todo || mongoose.model("Todo", todoSchema)
