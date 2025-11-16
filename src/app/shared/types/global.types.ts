import { User } from "../model/user.model";

export type Args<T = any> = T[];
export type UserWithoutPassword = Omit<User, 'password'>;
