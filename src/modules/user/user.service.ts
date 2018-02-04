import { Component, Inject } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Component()
export class UserService {

    /**
     * Método constructor
     *
     * @param userRepository 
     */
    constructor( @Inject( 'UserRepositoryToken' ) private readonly userRepository: Repository<User> ) { }

    /**
     * Busca todos os usuários
     *
     */
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    /**
     * Cria um novo usuário
     *
     * @param user 
     */
    async save( user: User ) {
        const u = this.userRepository.create( user );
        return await this.userRepository.save( u );
    }

    /**
     * Encontra um usuário pelo id
     *
     * @param id
     */
    async findById( id: number ): Promise<User> {
        return await this.userRepository.findOneById( id );
    }

    /**
     * Encontra um registro no banco
     *
     * @param params 
     */
    async findOne( params ) {
        return await this.userRepository.findOne( params );
    }
}

// End of file
