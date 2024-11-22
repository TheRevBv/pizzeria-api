import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Pedido } from '../../pedido/entities/pedido.entity';

export type PizzaDocument = Pizza & Document;

@Schema()
export class Pizza {
  @Prop({ required: true })
  tamano: string;

  @Prop({ type: [String], required: true })
  ingredientes2: string[];

  @Prop({ required: true })
  cantidad: number;

  @Prop({ required: true })
  subtotal: number;

  @Prop({ type: Types.ObjectId, ref: 'Pedido' }) // Usa Types.ObjectId
  pedido: Types.ObjectId | Pedido; // Especifica que puede ser ObjectId o Pedido
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
