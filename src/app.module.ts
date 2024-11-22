// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { PedidoModule } from './pedido/pedido.module';
import { PizzaModule } from './pizza/pizza.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PedidoModule,
    PizzaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
