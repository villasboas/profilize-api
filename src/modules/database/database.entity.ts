import { PrimaryGeneratedColumn, Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

/**
 * Entidade basica das tabelas
 *
 */
export class CoreEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column( 'datetime' )
    created_at: Date;

    @Column({ nullable: true, type: 'datetime' })
    updated_at: Date;

    @BeforeInsert()
    setCreatedAt() {
        this.created_at = new Date();
    }

    @BeforeUpdate()
    setUpdatedAt() {
        this.updated_at = new Date();
    }

    /**
     * Preenche a entidade com os dados passados
     *
     * @param pattern 
     */
    fill( patterns, source ) {

        // Percorre todos os padrões
        for( let pattern of patterns ) {

            // Verifica se existe no source e na classe
            if ( source[pattern] ) {

                // Adiciona o atributo
                this[pattern] = source[pattern];
            }
        }

        // Volta a instancia
        return this;
    }
}

// End of file
