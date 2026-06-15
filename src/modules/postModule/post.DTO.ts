import { z } from "zod";
import {
  createPostSchema,
  deletePostSchema,
  updatePostSchema,
} from "./post.validation";

export type CreatePostDTO = z.infer<typeof createPostSchema>;
export type UpdatePostDTO = z.infer<typeof updatePostSchema>;
export type DeletePostDTO = z.infer<typeof deletePostSchema>;
