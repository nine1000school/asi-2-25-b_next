import { Schema } from "mongoose"

export const todoSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "Todo",
  },
  isDone: Boolean,
})
