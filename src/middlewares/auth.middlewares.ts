import { NextFunction, Request } from 'express';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import usuarioModel from '../models/usuario.model';
import { UsuarioInterface } from '../interfaces/usuario.interface';
class AuthMiddlewares{

    public async autorizarUsuarioByToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const token = req.query.token || req.headers['x-acess-token'];
        if (!token) {
            return res.status(401).send({menssage: 'Acesso Restrito!'});
        }
        try {
            
            const usuarioToken = jwt.verify(token.toString(), 'SECRET') as UsuarioInterface;
            const usuario = await usuarioModel.findById(usuarioToken._id);
    
            if (!usuario) {
                return res.status(400).send({menssage: 'Usuário não existe no banco de dados!'});
            }
            req.usuario = usuario;

            return next();
        } catch (error) {
            return res.status(401).send({menssage: 'Token invalido!'});
        }
    }

    public async autorizarUsuarioByParams(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const usuario = await usuarioModel.findById(req.params.id);
    
            if (!usuario) {
                return res.status(400).send({ message: 'Usuário não encontrado!'});
            }
            req.usuarioChat = usuario;

            return next();
        } catch (error) {
            return res.status(400).send({ message: 'Id do usuário inválido!'});
        }
    }
}

export default new AuthMiddlewares();