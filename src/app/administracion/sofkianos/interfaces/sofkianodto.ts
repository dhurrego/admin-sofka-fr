export interface SofkianoDTO {
    tipoIdentificacion: string,
    numeroIdentificacion: string,
    primerNombre: string,
    segundoNombre?: string,
    primerApellido: string,
    segundoApellido?: string,
    direccion: string,
    activo: boolean,
    cliente?: any
}