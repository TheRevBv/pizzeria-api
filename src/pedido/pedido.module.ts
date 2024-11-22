// src/pedido/pedido.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from './entities/pedido.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { Pizza, PizzaSchema } from '../pizza/entities/pizza.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pedido.name, schema: PedidoSchema }]),
    MongooseModule.forFeature([{ name: Pizza.name, schema: PizzaSchema }]),
  ],
  providers: [PedidoService],
  controllers: [PedidoController],
})
export class PedidoModule {}
