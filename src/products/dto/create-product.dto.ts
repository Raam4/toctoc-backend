import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, IsUppercase, MaxLength, Min } from "class-validator";
import { Tag } from "src/tags/entities/tag.entity";

export class CreateProductDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @MaxLength(3)
    @IsUppercase()
    alias: string;

    @IsString()
    description: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    cost: number;

    @IsArray()
    tags: Tag[];
}
