import { HttpException, HttpStatus } from "@nestjs/common";

export class UsuarioNaoCadastradoException extends HttpException {
    constructor() {
      super('Usuário não cadastrado', HttpStatus.NOT_FOUND);
    }
}