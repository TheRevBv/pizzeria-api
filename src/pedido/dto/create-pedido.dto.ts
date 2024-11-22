import {
  IsString,
  IsArray,
  IsInt,
  Min,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { CreatePizzaDto } from 'src/pizza/dto';

export class CreatePedidoDto {
  @IsString()
  nombreCliente: string;

  @IsString()
  direccion: string;

  @IsString()
  telefono: string;

  @IsDateString()
  fechaCompra: string; // O cambia a Date si prefieres

  @IsArray()
  pizzas: CreatePizzaDto[];

  @IsNumber()
  total: number;
}
