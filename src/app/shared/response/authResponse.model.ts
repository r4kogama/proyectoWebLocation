import { AuthErrorMessages } from "../../shared/model/errorsMessages";
import { SuccessMessages } from "../../shared/model/successMessages";
import { FirebaseAuthErrorMap } from "../../shared/model/fbAuthErrorMap";
import { HttpStatus } from "../../shared/model/httpStatusCode.model";
import { ResponseData } from "../../shared/model/responseData.model";

export class AuthResponseModel {

  // ========== Métodos Específicos de Autenticación ==========

  signInSuccess<T>(mapperUser: T): ResponseData<T> {
    return {
      status: HttpStatus.OK,
      message: SuccessMessages.LOGIN_SUCCESS,
      data: mapperUser,
      success: true
    };
  }
  registerSuccess<T>(mapperUser: T): ResponseData<T> {
    return {
      status: HttpStatus.CREATED,
      message: SuccessMessages.REGISTER_SUCCESS,
      data: mapperUser,
      success: true
    };
  }
  signInFailed(errorCode: string): ResponseData<never> {
    const message: string = FirebaseAuthErrorMap[errorCode] || AuthErrorMessages.LOGIN_ERROR;

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
   signInProviderFailed(errorCode: string): ResponseData<never> {
    const message: string = FirebaseAuthErrorMap[errorCode] || AuthErrorMessages.LOGIN_PROVIDER_ERROR;
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

  signOutFailed(errorCode: string): ResponseData<never> {
    const message: string = FirebaseAuthErrorMap[errorCode] || AuthErrorMessages.LOGOUT_ERROR;

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
  registerFailed(errorCode: string): ResponseData<never> {
    const message: string = FirebaseAuthErrorMap[errorCode] || AuthErrorMessages.REGISTER_ERROR;

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
  logOutSuccess(): ResponseData<void> {
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
  authNoToken(): ResponseData<never> {
    return {
      status: HttpStatus.UNAUTHORIZED,
      message: AuthErrorMessages.AUTH_NO_TOKEN,
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
      message: message,
      success: false,
      error: {
        code: 'NULL_USER',
        message: message
      }
    };
  }
}
