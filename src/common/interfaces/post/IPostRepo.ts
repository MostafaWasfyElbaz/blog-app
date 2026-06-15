import { IPost } from "./IPost";

export interface IPostRepo {
  createPost(post: IPost): Promise<IPost | null>;
  getAllPosts(): Promise<IPost[]>;
  getPostById(id: string): Promise<IPost | null>;
  updatePost(
    id: string,
    userId: string,
    post: Partial<IPost>,
  ): Promise<IPost | null>;
  deletePost(id: string, userId: string): Promise<boolean>;
}
