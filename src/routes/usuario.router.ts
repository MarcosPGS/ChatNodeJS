import { Router } from 'express';
import usuarioController from '../controllers/usuario.controller';
import authMiddlewares from '../middlewares/auth.middlewares';

const usuarioRouter = Router();
usuarioRouter.post('/cadastro', usuarioController.cadastrar);
usuarioRouter.post('/login', usuarioController.autenticar);
usuarioRouter.get(
    '/:id',
     authMiddlewares.autorizarUsuarioByParams,
    authMiddlewares.autorizarUsuarioByToken,
    usuarioController.getByID
);

usuarioRouter.get(
    '/',
    authMiddlewares.autorizarUsuarioByToken,
    usuarioController.listar
);

export default usuarioRouter;