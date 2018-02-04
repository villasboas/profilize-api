import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Exceção para successos
 *
 */
export class SetResponse {
    /**
     * Status da requisição
     *
     */
    statusCode: 200;

    /**
     * Dados da resposta
     *
     */
    data = {};

    /**
     * Método construtor
     *
     * @param data
     */
    constructor( data: any ) {
        this.data = data;
    }
}

// End of file
