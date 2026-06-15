import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const updatePostSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  id: z.string().length(24, "Invalid post ID"),
});

export const deletePostSchema = z.object({
  id: z.string().length(24, "Invalid post ID"),
});
