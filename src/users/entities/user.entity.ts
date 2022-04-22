import { Exclude } from 'class-transformer';
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public fullName: string;

    @Column({unique: true})
    public username: string;

    @Column()
    @Exclude()
    public password: string;

    @Column({nullable: true})
    @Exclude()
    public currentHashedRefreshToken?: string;

    @DeleteDateColumn()
    public deletedAt: Date;
}
