import { HttpStatus } from '../../shared/model/httpStatusCode.model';
import { StatusResponse } from '../../shared/model/responseStatusManager.model';
import { ResponseData } from '../../shared/model/responseData.model';
import { SuccessMessages } from '../../shared/model/successMessages';
import { AuthErrorMessages } from '../../shared/model/errorsMessages';

export class HttpResponseBuilder implements StatusResponse {

  // ========== Métodos Genéricos ==========
  //status: code, message: context, data: info
  statusOk<T = unknown>(datas?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.OK,
      message: message || SuccessMessages.SUCCESS,
      data: datas,
      success: true
    };
  }

  statusNoContent<T = unknown>(datas?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.NO_CONTENT,
      message: message || AuthErrorMessages.NO_CONTENT,
      data : datas,
      success: true
    }
  }

  statusCreated<T = unknown>(datas?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.CREATED,
      message : message || SuccessMessages.CREATED,
      data: datas,
      success: true
    }
  }

  statusBadRequest<T = unknown>(datas?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.BAD_REQUEST,
      message: message || AuthErrorMessages.BAD_REQUEST,
      data: datas,
      success: false
    }
  }

  statusNotFound<T = unknown>(datas?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.NOT_FOUND,
      message: message || AuthErrorMessages.NOT_FOUND,
      data: datas,
      success: false
    }
  }

  statusServerError<T = unknown>(datas?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: message || AuthErrorMessages.INTERNAL_SERVER_ERROR,
      data: datas,
      success: false
    }
  }

  statusUnauthorized<T = unknown>(datas?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.UNAUTHORIZED,
      message: message || AuthErrorMessages.UNAUTHORIZED,
      data: datas,
      success: false
    }
  }

  statusForbidden<T = unknown>(datas?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.FORBIDDEN,
      message: message || AuthErrorMessages.FORBIDDEN,
      data: datas,
      success: false
    }
  }

  statusInvalidData<T = unknown>(datas?: T, message?: string): ResponseData<T> {
    return {
      status: HttpStatus.BAD_REQUEST,
      message: message || AuthErrorMessages.INVALID_DATA,
      data: datas,
      success: false
    }
  }
}

