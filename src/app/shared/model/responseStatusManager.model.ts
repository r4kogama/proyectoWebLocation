import { ResponseData } from './responseData.model';

export interface StatusResponse {
  statusOk<T = unknown>(data?: T, message?: string): ResponseData<T>;
  statusNoContent<T = unknown>(data?: T, message?: string): ResponseData<T>;
  statusCreated<T = unknown>(data?: T, message?: string): ResponseData<T>;
  statusBadRequest<T = unknown>(data?: T, message?: string): ResponseData<T>;
  statusNotFound<T = unknown>(data?: T, message?: string): ResponseData<T>;
  statusServerError<T = unknown>(data?: T, message?: string): ResponseData<T>;
  statusUnauthorized<T = unknown>(data?: T, message?: string): ResponseData<T>;
  statusForbidden<T = unknown>(data?: T, message?: string): ResponseData<T>;
  statusInvalidData<T = unknown>(data?: T, message?: string): ResponseData<T>;
}
