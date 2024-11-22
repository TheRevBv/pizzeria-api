// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PedidoModule } from './pedido/pedido.module';
import { PizzaModule } from './pizza/pizza.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    PedidoModule,
    PizzaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
