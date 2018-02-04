import { Guard, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import * as passport from 'passport';

@Guard()
export class AuthGuard implements CanActivate {

    /**
     * Indica se pode ou não entrar na rota
     * 
     * @param dataOrRequest 
     * @param context 
     */
    async canActivate(dataOrRequest, context: ExecutionContext) {

        // Verifica se o usuário está autenticado
        const isAuthenticated = await new Promise<boolean>((resolve, reject) => {
            passport.authenticate( 'jwt', { session: false }, ( args ) => {
                console.log( args );
                if ( args != 200 ) {
                    return resolve( false );
                }
                return resolve( true );
            })( dataOrRequest.res.req, dataOrRequest.res, dataOrRequest.nex );
        });
        if ( !isAuthenticated ) {
            throw new HttpException( 'Erro de autenticacao', HttpStatus.UNAUTHORIZED );
        }
        return true;
    }
}

// End of file
