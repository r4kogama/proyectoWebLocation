import { HttpStatus } from '../../shared/model/httpStatusCode.model';
import { StatusResponse } from '../../shared/model/responseStatusManager.model';
import { ResponseData } from '../../shared/model/responseData.model';
import { SuccessMessages } from '../../shared/model/successMessages';
import { AuthErrorMessages } from '../../shared/model/errorsMessages';

export class HttpResponseBuilder implements StatusResponse {

  // ========== Métodos Genéricos ==========
  //status: code, message: context, data: info
  statusOk<T = unknown>(dataUser?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.OK,
      message: message || SuccessMessages.SUCCESS,
      data: dataUser,
      success: true
    };
  }

  statusNoContent<T = unknown>(dataUser?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.NO_CONTENT,
      message: message || AuthErrorMessages.NO_CONTENT,
      data : dataUser,
      success: true
    }
  }

  statusCreated<T = unknown>(dataUser?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.CREATED,
      message : message || SuccessMessages.CREATED,
      data: dataUser,
      success: true
    }
  }

  statusBadRequest<T = unknown>(dataUser?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.BAD_REQUEST,
      message: message || AuthErrorMessages.BAD_REQUEST,
      data: dataUser,
      success: false
    }
  }

  statusNotFound<T = unknown>(dataUser?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.NOT_FOUND,
      message: message || AuthErrorMessages.NOT_FOUND,
      data: dataUser,
      success: false
    }
  }

  statusServerError<T = unknown>(dataUser?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: message || AuthErrorMessages.INTERNAL_SERVER_ERROR,
      data: dataUser,
      success: false
    }
  }

  statusUnauthorized<T = unknown>(dataUser?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.UNAUTHORIZED,
      message: message || AuthErrorMessages.UNAUTHORIZED,
      data: dataUser,
      success: false
    }
  }

  statusForbidden<T = unknown>(dataUser?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.FORBIDDEN,
      message: message || AuthErrorMessages.FORBIDDEN,
      data: dataUser,
      success: false
    }
  }

  statusInvalidData<T = unknown>(dataUser?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.BAD_REQUEST,
      message: message || AuthErrorMessages.INVALID_DATA,
      data: dataUser,
      success: false
    }
  }
}

