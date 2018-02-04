import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Exceção para erros de execução
 *
 */
export class RejectException extends HttpException {
    constructor( message: string ) {
        super( message, HttpStatus.NOT_ACCEPTABLE);
    }
}

// End of file
