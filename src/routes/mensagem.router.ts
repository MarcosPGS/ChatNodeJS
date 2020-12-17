import { Router } from 'express';
import mensagemController from '../controllers/mensagem.controller';
import authMiddlewares from '../middlewares/auth.middlewares';

const mensagemRouter = Router();
/*
nesta requisiçao sera execultado de acordo com os parametros passados, se estiver tudo ok com o primeiro parametro passa para o proximo ser execultado
1: id
2: autorizarUsuarioByParams
3:autorizarUsuarioByToken
4:enviar

 */
mensagemRouter.post(
    '/:id',
    authMiddlewares.autorizarUsuarioByParams,
    authMiddlewares.autorizarUsuarioByToken,
    mensagemController.enviar
);

mensagemRouter.get(
    '/:id',
    authMiddlewares.autorizarUsuarioByParams,
    authMiddlewares.autorizarUsuarioByToken,
    mensagemController.listar
);

export default mensagemRouter;