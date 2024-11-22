import { IsString, IsArray, IsInt, Min, IsNumber } from 'class-validator';

export class CreatePizzaDto {
  @IsString()
  tamano: string;

  @IsArray()
  ingredientes2: string[];

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsNumber()
  subtotal: number;
}
