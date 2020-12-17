import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usuarioRouter from './routes/usuario.router';
import mensagemRouter from './routes/mensagem.router';

export class App {
  private express: express.Application;
  private porta = 9000;

  constructor() {
    this.express = express();
    this.listen();
    this.middlewares();
    this.database();
    this.routes();
  }

  public getApp(): express.Application{
      return this.express;
  }

  private middlewares(): void {
      this.express.use(express.json());
      this.express.use(cors());
      
  }
  private listen(): void {
    this.express.listen(this.porta, () => {
        console.log('Servidor iniciado na porta = ' + this.porta);
    });
  }


  private database(): void{
    mongoose.connect('mongodb+srv://marcos:ma072513@cluster0.xbltf.mongodb.net/cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
  }

  private routes(): void{
    this.express.use('/usuarios', usuarioRouter);
    this.express.use('/mensagens', mensagemRouter);
  }
}
