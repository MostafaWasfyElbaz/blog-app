import DBRepository from "../Repository/db.repository";
import { IUser, IUserRepo } from "../../common";
import { HydratedDocument, Model } from "mongoose";
import {User} from "../models";

export class UserRepository
  extends DBRepository<IUser>
  implements IUserRepo
{
  constructor(protected override readonly model: Model<IUser> = User) {
    super(model);
  }
  findUserByEmail = async (
    email: string,
  ): Promise<HydratedDocument<IUser> | null> => {
    const user = await this.findOne({ filter: { email } });
    return user as HydratedDocument<IUser> | null;
  };

  createUser = async ({
    user,
  }: {
    user: Partial<HydratedDocument<IUser>>;
  }): Promise<HydratedDocument<IUser>> => {
    const isExist = await this.findUserByEmail(user.email as string);
    if (isExist) {
      throw new Error("User already exists");
    }
    const [createdUser] = await this.create({ data: [user] });
    return createdUser as HydratedDocument<IUser>;
  };
}
