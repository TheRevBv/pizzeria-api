import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Pizza } from '../../pizza/entities/pizza.entity';

export type PedidoDocument = Pedido & Document;

@Schema()
export class Pedido {
  @Prop({ required: true })
  nombreCliente: string;

  @Prop({ required: true })
  direccion: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true })
  fechaCompra: Date;

  @Prop({ type: [Types.ObjectId], ref: 'Pizza', default: [] })
  pizzas: Types.ObjectId[] | Pizza[];

  @Prop({ required: true })
  total: number;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
