import { ClienteDTO } from "../../clientes/interfaces/clientedto";

export interface CantidadCambiosAsignacionesDTO {
    cliente: ClienteDTO,
    cantidadIngresos: number,
    cantidadSalidas: number
}