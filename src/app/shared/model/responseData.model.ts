import { User } from "./user.model";

export interface ResponseData<T = unknown> {
  user: User;
  status: number;
  message: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  success: boolean;
}
