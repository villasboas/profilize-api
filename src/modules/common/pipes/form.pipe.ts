import { FormPipeOptions } from './form.pipe';
import { RejectException } from './../../common/exceptions/reject.exception'
import { PipeTransform, Pipe, ArgumentMetadata, BadGatewayException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as validator from 'validator';

export interface FormPipeOptions {
    trim?: boolean|Array<string>
}

/**
 * Pipe de validação do formulário de Signup
 *
 */
@Pipe()
export class FormPipe implements PipeTransform<any> {

    /**
     * Grupos de validação
     *
     */
    groups = [];

    /**
     * Opçoes
     *
     */
    options: FormPipeOptions;
    
    /**
     * Seta os grupos de validação
     *
     * @param groups 
     */
    constructor( groups: any = '', opts: FormPipeOptions = null ) {
        if ( groups !instanceof Array ) {
            this.groups.push( groups )
        } else this.groups = groups;

        // Seta as opções
        this.options = opts;
    }

    /**
     * Aplica o trim nas propriedas do objeto
     * 
     * @param object 
     * @param trim 
     */
    private __trim( object, trim ) {

        // Verifica se trim é um array
        if ( trim instanceof Array ) {
            for( let item of trim ) {
                if ( typeof object[item] === 'string' )
                    object[item] = validator.trim( object[item] );
            }
        } else {
            for( let item in object ) {
                if ( typeof object[item] === 'string' )
                    object[item] = validator.trim( object[item] );
            }
        }

        // Volta o object
        return object;
    }

    /**
     * Método do pipe que válida o formulário de login
     *
     * @param value 
     * @param metadata 
     */
    async transform( value: any, metadata: ArgumentMetadata ) {

        // Obtem o metatype
        const { metatype } = metadata;

        // Obtem uma instancia da classe
        let object = plainToClass( metatype, value );

        // Verifica se existe o trim
        if ( this.options && this.options.trim ) {
            object = this.__trim( object, this.options.trim );
        }

        // Obtem os erros da classe
        const errors = await validate( object, { groups: this.groups } );
        if ( errors.length > 0 ) {
            for( let key in errors[0].constraints ) {
                throw new RejectException( errors[0].constraints[key] );
            }
        }

        // Volta o valor
        return value;
    }
}

// End of file
