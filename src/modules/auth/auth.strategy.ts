import * as BearerStrategy from 'passport-http-bearer';
import { AuthService } from './auth.service';
import * as JwtStrategy from 'passport-jwt';
import { Component } from '@nestjs/common';
import { AuthConfig } from './auth.config';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

@Component()
export class AuthStrategy {

    /**
     * Extrator do JWT
     *
     */
    extractJwt: JwtStrategy.ExtractJwt = JwtStrategy.ExtractJwt;
    
    /**
     * Método constructor
     *
     * @param authSerivce
     */
    constructor( private readonly authSerivce: AuthService ) {
        this.__setStrategy();
    }

    /**
     * Seta a estratégia de validação
     *
     */
    private __setStrategy() {

        // Opçoes de configuração do JWT
        const opts = {
            jwtFromRequest: this.extractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: AuthConfig.secret
        };

        // Cria uma instancia da estratégia
        const instance = new JwtStrategy.Strategy( opts, ( req, payload, done ) => {
            this.verify( req, payload, done );
        });

        // Seta o passaport
        passport.use( instance );
    }

    /**
     * Verifica se o token é válido
     *
     * @param token 
     * @param done 
     */
    async verify( req, payload, done ) {
        
        // Verifica se a requisição é válida
        const isValid = await this.authSerivce.validateUser( payload )
        if ( !isValid ) {
            return done( null, 'Unauthorized' );
        } else return done( 200, false );
    }
}

// End of file
