import { Request, Response } from "express";
import mensagemModel from "../models/mensagem.model";
import usuarioModel from "../models/usuario.model";
import mensagemService from "../service/mensagem.service";

class UsuarioController {

    public async cadastrar(req: Request, res: Response): Promise<Response>{
        const usuario =  await  usuarioModel.create(req.body);
        //   return res.json({message : 'Usuario salvo com sucesso!'});

        const resposta  = {
            message : 'Usuário cadastrado com sucesso!',
            _id: usuario._id,
            nome: usuario.nome,
            senha: usuario.senha,
            avatar: usuario.avatar
        }
        return res.json(resposta);
    }

    public async autenticar(req: Request, res: Response): Promise<Response>{
        const {nome, senha} = req.body;
        const usuario  = await usuarioModel.findOne({nome});
        if (!usuario) {
            return res.status(400).send({message: 'Usuário não encontrado!'});
        }

        const senhaValida = await usuario.compararSenha(senha);
        if (!senhaValida) {
            return res.status(400).send({message: 'Senha incorreta!'});
        }

        return res.json({
            usuario: usuario,
            token: usuario.gerarToken(),
        });
    }

    public getByID(req: Request, res: Response){
        return res.json(req.usuarioChat);
    }

    public async listar(req: Request, res: Response): Promise<Response>{
        const idUsuarioLogado = req.usuario._id;
        const usuarios = await usuarioModel.find({_id: {$ne: idUsuarioLogado}});

        const  usuariosMensagens = await Promise.all(usuarios.map(usuario => {
            return mensagemModel.buscaChat(idUsuarioLogado, usuario._id)
            .sort('-createdAt')
            .limit(1)
            .map( mensagens => mensagemService.getResultadoMensagemUsuario(mensagens, usuario));
        }));

        const mensagensOrdenada = mensagemService.retornaMensagensOrdenadas(usuariosMensagens);

        return res.json(mensagensOrdenada)
    }

}

export default new UsuarioController();