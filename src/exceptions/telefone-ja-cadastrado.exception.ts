import { HttpException, HttpStatus } from "@nestjs/common";

export class TelefoneJaCadastradoException extends HttpException {
    constructor() {
      super('Telefone já cadastrado nessa lista', HttpStatus.BAD_REQUEST);
    }
}