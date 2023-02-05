export interface ModalSelector {
    titulo: string,
    descripcion: string,
    nombreElementos: string,
    elementos: Item[]
}

export interface Item {
    valor: string,
    descripcion: string
}