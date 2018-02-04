import { RejectException } from './../common/exceptions/reject.exception';
import { UserService } from './../user/user.service';
import { User } from './../user/user.entity';
import { AuthConfig } from './auth.config';
import { Component } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Component()
export class AuthService {

    /**
     * Método construtor
     *
     * @param userService 
     */
    constructor( private readonly userService: UserService ) {}

    /**
     * Cria um novo token
     *
     */
    async createToken( user: User ) {

        // Define a data de expiracao
        const expiresIn = AuthConfig.expiresIn;

        // Cria o token
        const accessToken = jwt.sign( JSON.parse( JSON.stringify( user.json() ) ), AuthConfig.secret, { expiresIn } );

        // Volta o objeto com o token
        return { expiresIn, accessToken };
    }

    /**
     * Faz o login no app
     *
     * @param credentials
     */
    async login( credentials: { email: string, senha: string } ) {

        // Busca o usuário
        const user = await this.userService.findOne({ email: credentials.email });

        // Verifica se o mesmo existe
        if ( !user ) throw 'Nenhum usuário encontrado para esse e-mail.';
        if ( bcrypt.compareSync( credentials.senha, user.senha ) ) {

            // Seta a data de login
            user.setLastLogin();
            await this.userService.save( user );

            return user;
        } else throw 'A senha digitada está incorreta.';
    }

    /**
     * Faz o signup
     *
     * @param user 
     */
    async signup( user: User ) {

        // Verificia se já existe um usuário com esse e-mail
        const inDb = await this.userService.findOne({ email: user.email });
        if ( !inDb ) {

            // Salva o usuário
            return await this.userService.save( user );

        } else throw 'This e-mail is already in use.';
    }

    /**
     * Valida o usuário no header
     *
     * @param signedUser 
     */
    async validateUser( user ): Promise<boolean> {

        // Busca o user
        const userDB = await this.userService.findOne({ id: user.id, 
                                                        email: user.email, 
                                                        nome: user.nome });
        // Volta true por padrão
        return ( userDB ) ? true : false;
    }
}

// End of file
