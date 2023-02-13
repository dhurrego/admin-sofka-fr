export interface RegistrarUsuarioDTO {
    correo: string,
    password: string,
    rol: 'ADMINISTRADOR' | 'EMPLEADO'
}