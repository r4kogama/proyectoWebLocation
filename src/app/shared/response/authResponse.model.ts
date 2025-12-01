import { AuthErrorMessages } from "../../shared/model/errorsMessages";
import { SuccessMessages } from "../../shared/model/successMessages";
import { FirebaseAuthErrorMap } from "../../shared/model/fbAuthErrorMap";
import { HttpStatus } from "../../shared/model/httpStatusCode.model";
import { ResponseData } from "../../shared/model/responseData.model";

export class AuthResponseModel {

  // ========== Métodos Específicos de Autenticación ==========

  signInSuccess<T>(datas: T): ResponseData<T> {
    return {
      status: HttpStatus.OK,
      message: SuccessMessages.LOGIN_SUCCESS,
      data: datas,
      success: true
    };
  }
  registerSuccess<T>(datas: T): ResponseData<T> {
    return {
      status: HttpStatus.CREATED,
      message: SuccessMessages.REGISTER_SUCCESS,
      data: datas,
      success: true
    };
  }
  passwordResetSuccess<T>(datas: T): ResponseData<T> {
    return {
      status: HttpStatus.OK,
      message: SuccessMessages.SEND_LINK_SUCCESS,
      data: datas,
      success: true
    };
  }
  signInFailed(errorCode: string): ResponseData<never> {
    const message: string = FirebaseAuthErrorMap[errorCode] || AuthErrorMessages.LOGIN_ERROR;

    return {
      status: HttpStatus.UNAUTHORIZED,
      message: 'LOGIN_ERROR',
      success: false,
      error: {
        code: errorCode,
        message: message
      }
    };
  }

   signInProviderFailed(errorCode: string): ResponseData<never> {
    const message: string = FirebaseAuthErrorMap[errorCode] || AuthErrorMessages.LOGIN_PROVIDER_ERROR;
    return {
      status: HttpStatus.BAD_REQUEST,
      message: 'LOGIN_PROVIDER_ERROR',
      success: false,
      error: {
        code: errorCode,
        message: message
      }
    };
  }

  signOutFailed(errorCode: string): ResponseData<never> {
    const message: string = FirebaseAuthErrorMap[errorCode] || AuthErrorMessages.LOGOUT_ERROR;

    return {
      status: HttpStatus.BAD_REQUEST,
      message: 'LOGOUT_ERROR',
      success: false,
      error: {
        code: errorCode,
        message: message
      }
    };
  }
  registerFailed(errorCode: string): ResponseData<never> {
    const message: string = FirebaseAuthErrorMap[errorCode] || AuthErrorMessages.REGISTER_ERROR;

    return {
      status: HttpStatus.BAD_REQUEST,
      message: 'REGISTER_ERROR',
      success: false,
      error: {
        code: errorCode,
        message: message
      }
    };
  }
  logOutSuccess(): ResponseData<void> {
    return {
      status: HttpStatus.OK,
      message: SuccessMessages.LOGOUT_SUCCESS,
      success: true
    };
  }
  authNoUser(): ResponseData<never> {
    return {
      status: HttpStatus.UNAUTHORIZED,
      message: 'AUTH_NO_USER',
      success: false,
      error: {
        code: 'AUTH_NO_USER',
        message: AuthErrorMessages.AUTH_NO_USER
      }
    };
  }
  authNoEmail(): ResponseData<never> {
    return {
      status: HttpStatus.UNAUTHORIZED,
      message: 'INVALID_CURRENT_EMAIL',
      success: false,
      error: {
        code: 'INVALID_CURRENT_EMAIL',
        message: AuthErrorMessages.INVALID_CURRENT_EMAIL
      }
    };
  }
  authNoToken(): ResponseData<never> {
    return {
      status: HttpStatus.UNAUTHORIZED,
      message: 'AUTH_NO_TOKEN',
      success: false,
      error: {
        code: 'AUTH_NO_TOKEN',
        message: AuthErrorMessages.AUTH_NO_TOKEN
      }
    };
  }
  handleNullUser(errorCode: string): ResponseData<never> {
    const message: string = FirebaseAuthErrorMap[errorCode] || AuthErrorMessages.NULL_USER;
    return {
      status: HttpStatus.UNAUTHORIZED,
      message: 'NULL_USER',
      success: false,
      error: {
        code: errorCode,
        message: message
      }
    };
  }
}
