import { CoreEntity } from './../database/database.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { IsEmail, Length, Matches } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends CoreEntity {

    @Column({ length: 60 })
    @Length( 2, 60, {
        groups: [ 'signup' ]
    })
    @Matches( /^[A-Z0-9a-z ]*$/, {
        groups: [ 'signup' ]
    } )
    nome: string;

    @Column( 'varchar', { unique: true })
    @IsEmail({}, {
        groups: [ 'login', 'signup' ]
    })
    email: string;

    @Column( 'varchar' )
    @Length( 6, 16, {
        groups: [ 'login', 'signup' ]
    })
    senha: string;

    @Column( 'datetime', { nullable: true } )
    last_login: Date;

    @BeforeInsert()
    hashPassword() {

        // Gera um novo salt
        const salt = bcrypt.genSaltSync( 10 );

        // Gera a senha encriptografada
        this.senha = bcrypt.hashSync( this.senha, salt );
    }

    /**
     * Seta a data do ultimo login
     *
     */
    setLastLogin() {
        this.last_login = new Date();
    }
    
    /**
     * Volta um JSON com os campos visiveis
     *
     */
    json() {
        return {
            id: this.id,
            email: this.email,
            nome: this.nome,
            last_login: this.last_login,
            created_at: this.created_at
        }
    }
}

// End of file
