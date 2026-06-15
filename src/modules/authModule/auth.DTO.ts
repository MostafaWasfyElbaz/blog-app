import { loginSchema, signupSchema } from "./user.validation";
import { z } from "zod";

export type registerDTO = z.infer<typeof signupSchema>;
export type loginDTO = z.infer<typeof loginSchema>;
