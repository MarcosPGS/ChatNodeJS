import { UsuarioInterface } from './usuario.interface';
export interface MensagemInterface{
    remetente?: string;
    destinatario?: string;
    texto?: string;
    createdAt?: Date;
}

export interface MensagemUsuario extends UsuarioInterface{
    ultimaMensagem: string,
    dataUltimaMensagem: Date,
}