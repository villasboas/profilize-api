import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'thunder',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true
    }),
  },
];

// End of file
