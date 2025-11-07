import { AuthErrorMessages } from "./errorsMessages";

/**
 * Mapeo completo de errores de Firebase Authentication a mensajes
 * Usa las claves del enum AuthErrorMessages como valores
 */
export const FirebaseAuthErrorMap: Record<string, string> = {
  // Errores de configuración
  'auth/app-deleted': AuthErrorMessages.APP_DELETED,
  'auth/auth-domain-config-required': AuthErrorMessages.AUTH_DOMAIN_CONFIG_REQUIRED,
  'auth/operation-not-supported-in-this-environment': AuthErrorMessages.OPERATION_NOT_SUPPORTED_IN_THIS_ENVIRONMENT,
  'auth/invalid-api-key': AuthErrorMessages.INVALID_API_KEY,
  'auth/app-not-authorized': AuthErrorMessages.APP_NOT_AUTHORIZED,

  // Errores de autenticación - Login
  'auth/user-not-found': AuthErrorMessages.USER_NOT_FOUND,
  'auth/wrong-password': AuthErrorMessages.WRONG_PASSWORD,
  'auth/user-disabled': AuthErrorMessages.USER_DISABLED,
  'auth/invalid-email': AuthErrorMessages.INVALID_EMAIL,
  'auth/invalid-credential': AuthErrorMessages.INVALID_CREDENTIAL,
  'auth/too-many-requests': AuthErrorMessages.TOO_MANY_REQUESTS,

  // Errores de registro
  'auth/email-already-in-use': AuthErrorMessages.EMAIL_ALREADY_IN_USE,
  'auth/weak-password': AuthErrorMessages.WEAK_PASSWORD,
  'auth/operation-not-allowed': AuthErrorMessages.OPERATION_NOT_ALLOWED,
  'auth/account-exists-with-different-credential': AuthErrorMessages.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL,
  'auth/credential-already-in-use': AuthErrorMessages.CREDENTIAL_ALREADY_IN_USE,

  // Errores de verificación
  'auth/expired-action-code': AuthErrorMessages.EXPIRED_ACTION_CODE,
  'auth/invalid-action-code': AuthErrorMessages.INVALID_ACTION_CODE,
  'auth/invalid-verification-code': AuthErrorMessages.INVALID_VERIFICATION_CODE,
  'auth/invalid-verification-id': AuthErrorMessages.INVALID_VERIFICATION_ID,

  // Errores de token
  'auth/invalid-user-token': AuthErrorMessages.INVALID_USER_TOKEN,
  'auth/user-token-expired': AuthErrorMessages.USER_TOKEN_EXPIRED,
  'auth/id-token-expired': AuthErrorMessages.ID_TOKEN_EXPIRED,
  'auth/id-token-revoked': AuthErrorMessages.ID_TOKEN_REVOKED,
  'auth/invalid-id-token': AuthErrorMessages.INVALID_ID_TOKEN,
  'auth/custom-token-mismatch': AuthErrorMessages.CUSTOM_TOKEN_MISMATCH,
  'auth/invalid-custom-token': AuthErrorMessages.INVALID_CUSTOM_TOKEN,
  'auth/requires-recent-login': AuthErrorMessages.REQUIRES_RECENT_LOGIN,
  'auth/session-cookie-revoked': AuthErrorMessages.SESSION_COOKIE_REVOKED,

  // Errores de red
  'auth/network-request-failed': AuthErrorMessages.NETWORK_REQUEST_FAILED,
  'auth/timeout': AuthErrorMessages.TIMEOUT,

  // Errores de reCAPTCHA
  'auth/captcha-check-failed': AuthErrorMessages.CAPTCHA_CHECK_FAILED,

  // Errores de popup/ventana emergente
  'auth/cancelled-popup-request': AuthErrorMessages.CANCELLED_POPUP_REQUEST,
  'auth/popup-blocked': AuthErrorMessages.POPUP_BLOCKED,
  'auth/popup-closed-by-user': AuthErrorMessages.POPUP_CLOSED_BY_USER,

  // Errores de dominio
  'auth/unauthorized-domain': AuthErrorMessages.UNAUTHORIZED_DOMAIN,
  'auth/invalid-dynamic-link-domain': AuthErrorMessages.INVALID_DYNAMIC_LINK_DOMAIN,
  'auth/unauthorized-continue-uri': AuthErrorMessages.UNAUTHORIZED_CONTINUE_URI,

  // Errores de URL/URI
  'auth/invalid-continue-uri': AuthErrorMessages.INVALID_CONTINUE_URI,
  'auth/missing-continue-uri': AuthErrorMessages.MISSING_CONTINUE_URI,
  'auth/invalid-page-token': AuthErrorMessages.INVALID_PAGE_TOKEN,
  'auth/invalid-redirect-uri': AuthErrorMessages.INVALID_REDIRECT_URI,

  // Errores de teléfono
  'auth/invalid-phone-number': AuthErrorMessages.INVALID_PHONE_NUMBER,
  'auth/missing-phone-number': AuthErrorMessages.MISSING_PHONE_NUMBER,
  'auth/quota-exceeded': AuthErrorMessages.QUOTA_EXCEEDED,

  // Errores de plataforma móvil
  'auth/missing-android-pkg-name': AuthErrorMessages.MISSING_ANDROID_PKG_NAME,
  'auth/missing-ios-bundle-id': AuthErrorMessages.MISSING_IOS_BUNDLE_ID,

  // Errores de persistencia
  'auth/invalid-persistence-type': AuthErrorMessages.INVALID_PERSISTENCE_TYPE,
  'auth/unsupported-persistence-type': AuthErrorMessages.UNSUPPORTED_PERSISTENCE_TYPE,
  'auth/web-storage-unsupported': AuthErrorMessages.WEB_STORAGE_UNSUPPORTED,

  // Errores de argumentos
  'auth/argument-error': AuthErrorMessages.ARGUMENT_ERROR,
  'auth/invalid-argument': AuthErrorMessages.INVALID_ARGUMENT,

  // Errores de usuario personalizado
  'auth/invalid-claims': AuthErrorMessages.INVALID_CLAIMS,
  'auth/claims-too-large': AuthErrorMessages.CLAIMS_TOO_LARGE,
  'auth/invalid-creation-time': AuthErrorMessages.INVALID_CREATION_TIME,
  'auth/invalid-disabled-field': AuthErrorMessages.INVALID_DISABLED_FIELD,
  'auth/invalid-display-name': AuthErrorMessages.INVALID_DISPLAY_NAME,
  'auth/invalid-email-verified': AuthErrorMessages.INVALID_EMAIL_VERIFIED,
  'auth/invalid-last-sign-in-time': AuthErrorMessages.INVALID_LAST_SIGN_IN_TIME,
  'auth/invalid-password': AuthErrorMessages.INVALID_PASSWORD,
  'auth/invalid-photo-url': AuthErrorMessages.INVALID_PHOTO_URL,
  'auth/invalid-uid': AuthErrorMessages.INVALID_UID,
  'auth/null-user': AuthErrorMessages.NULL_USER,
  'auth/reserved-claims': AuthErrorMessages.RESERVED_CLAIMS,

  // Errores de hash (importación de usuarios)
  'auth/invalid-hash-algorithm': AuthErrorMessages.INVALID_HASH_ALGORITHM,
  'auth/invalid-hash-block-size': AuthErrorMessages.INVALID_HASH_BLOCK_SIZE,
  'auth/invalid-hash-derived-key-length': AuthErrorMessages.INVALID_HASH_DERIVED_KEY_LENGTH,
  'auth/invalid-hash-key': AuthErrorMessages.INVALID_HASH_KEY,
  'auth/invalid-hash-memory-cost': AuthErrorMessages.INVALID_HASH_MEMORY_COST,
  'auth/invalid-hash-parallelization': AuthErrorMessages.INVALID_HASH_PARALLELIZATION,
  'auth/invalid-hash-rounds': AuthErrorMessages.INVALID_HASH_ROUNDS,
  'auth/invalid-hash-salt-separator': AuthErrorMessages.INVALID_HASH_SALT_SEPARATOR,
  'auth/invalid-password-hash': AuthErrorMessages.INVALID_PASSWORD_HASH,
  'auth/invalid-password-salt': AuthErrorMessages.INVALID_PASSWORD_SALT,
  'auth/missing-hash-algorithm': AuthErrorMessages.MISSING_HASH_ALGORITHM,

  // Errores de importación de usuarios
  'auth/invalid-user-import': AuthErrorMessages.INVALID_USER_IMPORT,
  'auth/invalid-provider-data': AuthErrorMessages.INVALID_PROVIDER_DATA,
  'auth/invalid-provider-id': AuthErrorMessages.INVALID_PROVIDER_ID,
  'auth/maximum-user-count-exceeded': AuthErrorMessages.MAXIMUM_USER_COUNT_EXCEEDED,
  'auth/missing-uid': AuthErrorMessages.MISSING_UID,

  // Errores de sesión
  'auth/invalid-session-cookie-duration': AuthErrorMessages.INVALID_SESSION_COOKIE_DURATION,

  // Errores de duplicados
  'auth/uid-alread-exists': AuthErrorMessages.UID_ALREADY_EXISTS,
  'auth/email-already-exists': AuthErrorMessages.EMAIL_ALREADY_EXISTS,
  'auth/phone-number-already-exists': AuthErrorMessages.PHONE_NUMBER_ALREADY_EXISTS,

  // Errores de permisos
  'auth/insufficient-permission': AuthErrorMessages.INSUFFICIENT_PERMISSION,
  'auth/project-not-found': AuthErrorMessages.PROJECT_NOT_FOUND,

  // Errores internos
  'auth/internal-error': AuthErrorMessages.INTERNAL_ERROR,
};

/**
 * Función auxiliar para obtener el mensaje de error de Firebase
 * @param error - Error de Firebase con propiedad 'code'
 * @returns Mensaje de error traducido o mensaje genérico
 */
export const getFirebaseErrorMessage = (error: any): string => {
  if (!error) {
    return 'Ocurrió un error inesperado';
  }

  const errorCode = error.code || error.message;
  return FirebaseAuthErrorMap[errorCode] || error.message || 'Ocurrió un error inesperado';
};
