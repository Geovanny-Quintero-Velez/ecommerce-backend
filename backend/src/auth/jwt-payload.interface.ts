export interface JwtPayload {
    sub: string; // Subject: Identificador único del usuario (por ejemplo, el ID de usuario)
    role: string; // Rol del usuario (por ejemplo, 'admin' o 'user')
    email?: string; // Correo electrónico del usuario (opcional)
    iat?: number; // Tiempo de emisión del token (opcional)
    exp?: number; // Tiempo de expiración del token (opcional)
  }
  