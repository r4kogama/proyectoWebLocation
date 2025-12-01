/**
 * Enum con todos los mensajes de error de Firebase Authentication
 * Estos mensajes se usan como valores en FirebaseAuthErrorMap
 */
export enum AuthErrorMessages {
  // Errores de configuración
  APP_DELETED = 'No se encontró la base de datos',
  AUTH_DOMAIN_CONFIG_REQUIRED = 'No se ha proporcionado la configuración para la autenticación',
  OPERATION_NOT_SUPPORTED_IN_THIS_ENVIRONMENT = 'Esta operación no se admite en el entorno que se realiza. Asegúrese de que debe ser http o https',
  INVALID_API_KEY = 'La clave API proporcionada no es válida',
  APP_NOT_AUTHORIZED = 'Aplicación no autorizada para autenticarse con la clave dada',
  ERROR_REDIRECT = 'Error desconocido al redirigir a la cuenta del proveedor seleccionado',
  // Errores de autenticación - Login
  USER_NOT_FOUND = 'Usuario no existente',
  WRONG_PASSWORD = 'Contraseña incorrecta',
  USER_DISABLED = 'El usuario correspondiente a la credencial proporcionada ha sido deshabilitado',
  INVALID_EMAIL = 'La dirección de email no es válida',
  INVALID_CREDENTIAL = 'Las credencials son incorrectas',
  TOO_MANY_REQUESTS = 'Las solicitudes se bloquearon debido a una actividad inusual. Vuelva a intentarlo después de un tiempo',
  AUTH_ERROR = 'Error inesperado durante la autenticación.',

  // Errores de registro
  EMAIL_ALREADY_IN_USE = 'Este email ya está en uso',
  WEAK_PASSWORD = 'La contraseña es demasiado débil',
  OPERATION_NOT_ALLOWED = 'El tipo de cuenta correspondiente a esta credencial aún no está activado',
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL = 'Email ya asociado con otra cuenta',
  CREDENTIAL_ALREADY_IN_USE = 'Ya existe una cuenta para esta credencial',

  // Errores de verificación
  EXPIRED_ACTION_CODE = 'El código de acción o el enlace ha caducado',
  INVALID_ACTION_CODE = 'El código de acción no es válido. Esto puede suceder si el código está mal formado o ya se ha utilizado',
  INVALID_VERIFICATION_CODE = 'El código de verificación de credencial no es válido',
  INVALID_VERIFICATION_ID = 'El ID de verificación de credencial no es válido',

  // Errores de token
  INVALID_USER_TOKEN = 'El usuario actual no fue identificado',
  USER_TOKEN_EXPIRED = 'El token del usuario actual ha caducado',
  ID_TOKEN_EXPIRED = 'El token informado ha caducado',
  ID_TOKEN_REVOKED = 'El token informado ha caducado',
  INVALID_ID_TOKEN = 'El código de token ingresado no es válido',
  CUSTOM_TOKEN_MISMATCH = 'El token es diferente del estándar solicitado',
  INVALID_CUSTOM_TOKEN = 'El token proporcionado no es válido',
  REQUIRES_RECENT_LOGIN = 'El último tiempo de acceso del usuario no cumple con el límite de seguridad',
  SESSION_COOKIE_REVOKED = 'La sesión COOKIE ha expirado',
  AUTH_NO_TOKEN = 'Error al obtener el token de acceso. Es posible que la autenticación del proveedor haya fallado.',

  // Errores de red
  NETWORK_REQUEST_FAILED = 'Fallo de red por mala conexión',
  TIMEOUT = 'Tiempo de respuesta excedido. Es posible que el dominio no esté autorizado para realizar operaciones',

  // Errores de reCAPTCHA
  CAPTCHA_CHECK_FAILED = 'El token de respuesta reCAPTCHA no es válido, ha caducado o el dominio no está permitido',

  // Errores de popup/ventana emergente
  CANCELLED_POPUP_REQUEST = 'Solo se permite una solicitud de ventana emergente a la vez',
  POPUP_BLOCKED = 'El navegador ha bloqueado la ventana emergente',
  POPUP_CLOSED_BY_USER = 'El usuario cerró la ventana antes de completar',

  // Errores de dominio
  UNAUTHORIZED_DOMAIN = 'El dominio no está autorizado en Firebase',
  INVALID_DYNAMIC_LINK_DOMAIN = 'El dominio de enlace dinámico proporcionado, no está autorizado o configurado en el proyecto actual',
  UNAUTHORIZED_CONTINUE_URI = 'El dominio de la siguiente URL no está en la lista blanca',

  // Errores de URL/URI
  INVALID_CONTINUE_URI = 'La siguiente URL proporcionada en la solicitud no es válida',
  MISSING_CONTINUE_URI = 'La siguiente URL debe proporcionarse en la solicitud',
  INVALID_PAGE_TOKEN = 'La siguiente URL proporcionada en la solicitud no es válida',
  INVALID_REDIRECT_URI= 'La URI de redirección no está bien configurada',
  SEND_LINK_ERROR = 'El envio del enlace de recuperación de contraseña ha fallado',
  // Errores de teléfono
  INVALID_PHONE_NUMBER = 'El número de teléfono está en un formato no válido (estándar E.164)',
  MISSING_PHONE_NUMBER = 'El número de teléfono es obligatorio',
  QUOTA_EXCEEDED = 'Se ha excedido la cuota de SMS',

  // Errores de plataforma móvil
  MISSING_ANDROID_PKG_NAME = 'Se debe proporcionar un nombre de paquete para instalar la aplicación de Android',
  MISSING_IOS_BUNDLE_ID = 'Se debe proporcionar un nombre de paquete para instalar la aplicación iOS',

  // Errores de persistencia
  INVALID_PERSISTENCE_TYPE = 'El tipo especificado para la persistencia de datos no es válido',
  UNSUPPORTED_PERSISTENCE_TYPE = 'El entorno actual no admite el tipo especificado para la persistencia de datos',
  WEB_STORAGE_UNSUPPORTED = 'El navegador no es compatible con el almacenamiento o si el usuario ha deshabilitado esta función',

  // Errores de argumentos
  ARGUMENT_ERROR = 'Verifique la configuración del enlace para la aplicación',
  INVALID_ARGUMENT = 'Se proporcionó un argumento no válido a un método',

  // Errores de usuario personalizado
  INVALID_CLAIMS = 'Los atributos de registro personalizados no son válidos',
  CLAIMS_TOO_LARGE = 'El tamaño de la solicitud excede el tamaño máximo permitido de 1 Megabyte',
  INVALID_CREATION_TIME = 'La hora de creación debe ser una fecha UTC válida',
  INVALID_DISABLED_FIELD = 'La propiedad para el usuario deshabilitado no es válida',
  INVALID_DISPLAY_NAME = 'El nombre de usuario no es válido',
  INVALID_EMAIL_VERIFIED = 'El email no es válido',
  INVALID_CURRENT_EMAIL = 'El email proporcionado no es válido para el usuario actual',
  INVALID_LAST_SIGN_IN_TIME = 'La última hora de inicio de sesión debe ser una fecha UTC válida',
  INVALID_PASSWORD = 'La contraseña no es válida, debe tener al menos 6 caracteres de longitud',
  INVALID_PHOTO_URL = 'La URL de la foto del usuario no es válida',
  INVALID_UID = 'El identificador proporcionado debe tener un máximo de 128 caracteres',
  NULL_USER = 'No se encontró un usuario actual. Por favor, inicie sesión para continuar',
  RESERVED_CLAIMS = 'Una o más propiedades personalizadas proporcionaron palabras reservadas usadas',

  // Errores de hash (importación de usuarios)
  INVALID_HASH_ALGORITHM = 'El algoritmo HASH no es compatible con la criptografía',
  INVALID_HASH_BLOCK_SIZE = 'El tamaño del bloque HASH no es válido',
  INVALID_HASH_DERIVED_KEY_LENGTH = 'El tamaño de la clave derivada de HASH no es válido',
  INVALID_HASH_KEY = 'La clave HASH debe tener un búfer de bytes válido',
  INVALID_HASH_MEMORY_COST = 'El costo de la memoria HASH no es válido',
  INVALID_HASH_PARALLELIZATION = 'La carga paralela HASH no es válida',
  INVALID_HASH_ROUNDS = 'El redondeo HASH no es válido',
  INVALID_HASH_SALT_SEPARATOR = 'El campo separador SALT del algoritmo de generación HASH debe ser un búfer de bytes válido',
  INVALID_PASSWORD_HASH = 'La contraseña HASH no es válida',
  INVALID_PASSWORD_SALT = 'La contraseña SALT no es válida',
  MISSING_HASH_ALGORITHM = 'Es necesario proporcionar el algoritmo de generación HASH y sus parámetros para importar usuarios',

  // Errores de importación de usuarios
  INVALID_USER_IMPORT = 'El registro de usuario a importar no es válido',
  INVALID_PROVIDER_DATA = 'El proveedor de datos no es válido',
  INVALID_PROVIDER_ID = 'El identificador del proveedor no es compatible',
  MAXIMUM_USER_COUNT_EXCEEDED = 'Se ha excedido el número máximo permitido de usuarios a importar',
  MISSING_UID = 'Se requiere un identificador para la operación actual',

  // Errores de sesión
  INVALID_SESSION_COOKIE_DURATION = 'La duración de la COOKIE de la sesión debe ser un número válido en milisegundos, entre 5 minutos y 2 semanas',

  // Errores de duplicados
  UID_ALREADY_EXISTS = 'El identificador proporcionado ya está en uso',
  EMAIL_ALREADY_EXISTS = 'El email proporcionado ya está en uso',
  PHONE_NUMBER_ALREADY_EXISTS = 'El teléfono proporcionado ya está en uso',

  // Errores de permisos
  INSUFFICIENT_PERMISSION = 'La credencial utilizada no tiene acceso al recurso solicitado',
  PROJECT_NOT_FOUND = 'No se encontraron proyectos',

  // Errores internos
  INTERNAL_ERROR = 'El servidor de autenticación encontró un error inesperado al intentar procesar la solicitud',

  // Errores de genericos
  UNKNOWN_ERROR = 'Error desconocido, intenta nuevamente.',
  AUTH_NO_USER = 'No se pudo obtener la información del usuario',
  LOGIN_ERROR = 'Error de inicio de sesión, verifica credenciales',
  LOGOUT_ERROR = 'Error de cierre de sesión',
  REGISTER_ERROR = 'Error registro de nuevo usuario, revisa tu conexión e inténtalo de nuevo.',
  LOGIN_PROVIDER_ERROR = 'Error en el inicio de sesión con el proveedor seleccionado',
  NO_CONTENT = "La operación se realizó correctamente, pero no hay datos que mostrar.",
  BAD_REQUEST = "La solicitud enviada es incorrecta o está mal formada.",
  UNAUTHORIZED = "Acceso no autorizado. Debes iniciar sesión o proporcionar credenciales válidas.",
  FORBIDDEN = "Acceso prohibido. Aunque estás identificado, no tienes permisos suficientes para este recurso.",
  NOT_FOUND = "El recurso solicitado no existe o la dirección es incorrecta.",
  INTERNAL_SERVER_ERROR = "Error interno del servidor. Ha ocurrido un problema inesperado al procesar la solicitud.",
  INVALID_DATA = "Los datos enviados son inválidos o no cumplen las reglas requeridas."

}

