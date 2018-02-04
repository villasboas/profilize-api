import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
    imports: [ DatabaseModule ],
    components: [
        ...userProviders,
        UserService
    ],
    exports: [ UserService ]
})
export class UserModule {}
