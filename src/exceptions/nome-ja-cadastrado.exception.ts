import { HttpException, HttpStatus } from "@nestjs/common";

export class NomeJaCadastradoException extends HttpException {
    constructor(mensagem:string) {
      super(mensagem, HttpStatus.BAD_REQUEST);
    }
}