import { Connection, Repository } from 'typeorm';
import { User } from './user.entity';

/**
 * Provider da conexao com o banco
 *
 */
export const userProviders = [
  {
    provide: 'UserRepositoryToken',
    useFactory: ( connection: Connection) => connection.getRepository( User ),
    inject: [ 'DbConnectionToken' ],
  },
];

// End of file
