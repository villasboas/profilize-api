import { DatabaseModule } from './../database/database.module';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from './../user/user.module';
import { AuthStrategy } from './auth.strategy';
import { AuthService } from './auth.service';
import * as passport from 'passport';

@Module({
    imports: [
        UserModule
    ],
    components: [
        AuthStrategy,
        AuthService
    ],
    controllers: [
        AuthController
    ]
})
export class AuthModule {}

// End of file
