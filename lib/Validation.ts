import * as z from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(5).max(400),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(22)).min(1).max(3),
});
export const AnswerSchema = z.object({
  answer: z.string().min(100),
});
export const ProfileSchema = z.object({
  username: z.string().min(5).max(50),
  portfolioWebsite: z.string().url(),
  name: z.string().min(5).max(50),
  bio: z.string().min(10).max(200),
  location: z.string().min(5).max(50)
});
