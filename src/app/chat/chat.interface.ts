export interface IChat{
    isOpen: boolean;
    to: string;
    photoUrl: string;
    newSortKey: string // USADO PARA ORDENAR LA POSICION DEL CHAT EN LA BASE DE DATOS
    oldSortKey: string // USADO PARA ENCONTRAR EL CHAT EN LA BASE DE DATOS Y ACTUALIZARLO POR NEW SORT KEY
    chatId: string // USADO PARA IDENTIFICAR EL CHAT
    messages?: IMessage
}

export interface IMessage {
    addressee: string;
    sender: string;
    content: string;
    date: number;
  }