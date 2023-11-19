import * as z from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(2).max(130),
  explanation: z.string().min(100).max(1000),
  tags: z.array(z.string().min(1).max(22)).min(1).max(3),
});
