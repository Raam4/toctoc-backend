import { Tag } from 'src/tags/entities/tag.entity';
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public alias: string;

    @Column()
    public description: string;

    @Column()
    public price: number;

    @Column()
    public cost: number;

    @ManyToMany(() => Tag, (tag: Tag) => tag.products)
    @JoinTable()
    public tags: Tag[];

    @DeleteDateColumn()
    public deletedAt: Date;
}
