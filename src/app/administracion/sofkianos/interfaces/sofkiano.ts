export interface Sofkiano {
    dni: string,
    nombreCompleto: string,
    direccion: string,
    estado: 'ACTIVO' | 'INACTIVO',
    cliente?: string
}