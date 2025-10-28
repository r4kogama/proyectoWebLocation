import { AuthErrorMessages } from "../model/errorsMessages";
import { SuccessMessages } from "../model/successMessages";
import { FirebaseAuthErrorMap } from "../model/fbAuthErrorMap";
import { HttpStatus } from "../model/httpStatusCode.model";
import { ResponseData } from "../model/responseData.model";

export class AuthResponseModel {

  // ========== Métodos Específicos de Autenticación ==========

  signInSuccess<T>(userData: T): ResponseData<T> {
    return {
      status: HttpStatus.OK,
      message: SuccessMessages.LOGIN_SUCCESS,
      data: userData,
      success: true
    };
  }

  signInFailed(errorCode: string): ResponseData<never> {
    const message = FirebaseAuthErrorMap[errorCode] || AuthErrorMessages.LOGIN_ERROR;

    return {
      status: HttpStatus.UNAUTHORIZED,
      message: message,
      success: false,
      error: {
        code: errorCode,
        message: message
      }
    };
  }

  signOutFailed(errorCode: string): ResponseData<never> {
    const message = FirebaseAuthErrorMap[errorCode] || AuthErrorMessages.LOGOUT_ERROR;

    return {
      status: HttpStatus.BAD_REQUEST,
      message: message,
      success: false,
      error: {
        code: errorCode,
        message: message
      }
    };
  }

  registerSuccess<T>(userData: T): ResponseData<T> {
    return {
      status: HttpStatus.CREATED,
      message: SuccessMessages.REGISTER_SUCCESS,
      data: userData,
      success: true
    };
  }

  registerFailed(errorCode: string): ResponseData<never> {
    const message = FirebaseAuthErrorMap[errorCode] || AuthErrorMessages.REGISTER_ERROR;

    return {
      status: HttpStatus.BAD_REQUEST,
      message: message,
      success: false,
      error: {
        code: errorCode,
        message: message
      }
    };
  }

  logoutSuccess(): ResponseData<void> {
    return {
      status: HttpStatus.OK,
      message: SuccessMessages.LOGOUT_SUCCESS,
      success: true
    };
  }

  authNoUser(): ResponseData<never> {
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: AuthErrorMessages.AUTH_NO_USER,
      success: false,
      error: {
        code: 'AUTH_NO_USER',
        message: AuthErrorMessages.AUTH_NO_USER
      }
    };
  }

}
