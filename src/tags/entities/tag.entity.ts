import { Product } from "src/products/entities/product.entity";
import { Column, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @ManyToMany(() => Product, (product: Product) => product.tags)
    public products: Product[];

    @DeleteDateColumn()
    public deletedAt: Date;
}
