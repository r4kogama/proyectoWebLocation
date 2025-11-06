
export interface ResponseData<T = unknown> {
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
