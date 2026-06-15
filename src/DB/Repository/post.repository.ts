import { Model, Types } from "mongoose";
import { IPost, IPostRepo } from "../../common";
import DBRepository from "./db.repository";
import { Post } from "../models";

export class postRepository extends DBRepository<IPost> implements IPostRepo {
  constructor(protected override readonly model: Model<IPost> = Post) {
    super(model);
  }
  createPost = async (post: IPost): Promise<IPost | null> => {
    const createdPost = await this.create({
      data: [{ ...post }],
    });
    if (createdPost.length === 0) {
      return null;
    }
    return createdPost[0] as IPost;
  };

  getPostById = async (id: string): Promise<IPost | null> => {
    const post = await this.findById({
      id: Types.ObjectId.createFromHexString(id),
    });
    return post as IPost | null;
  };

  updatePost = async (
    id: string,
    userId: string,
    post: Partial<IPost>,
  ): Promise<IPost | null> => {
    const updatedPost = await this.updateOne({
      filter: {
        _id: new Types.ObjectId(id),
        author: new Types.ObjectId(userId),
      },
      data: { ...post },
    });
    if (updatedPost.modifiedCount === 0) {
      return null;
    }
    return (await this.getPostById(id)) as IPost;
  };

  getAllPosts = async (): Promise<IPost[]> => {
    const posts = await this.find({
      filter: {},
    });
    return (posts as IPost[]) || [];
  };

  deletePost = async (id: string, userId: string): Promise<boolean> => {
    const deletedPost = await this.deleteOne({
      filter: {
        _id: new Types.ObjectId(id),
        author: new Types.ObjectId(userId),
      },
    });
    if (deletedPost.deletedCount === 0) {
      return false;
    }
    return true;
  };
}
