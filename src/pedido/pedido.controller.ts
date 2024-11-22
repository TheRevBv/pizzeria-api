// src/pedido/pedido.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto';
import { Pedido } from './entities/pedido.entity';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  async getAllPedidos(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  async getPedido(@Param('id') id: string): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  @Post()
  async createPedido(
    @Body() createPedidoDto: CreatePedidoDto,
  ): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }

  @Delete(':id')
  async deletePedido(@Param('id') id: string): Promise<void> {
    return this.pedidoService.remove(id);
  }

  @Get('ventas/dia')
  async getVentasPorDia(@Query('dia') dia: string): Promise<Pedido[]> {
    return this.pedidoService.findVentasPorDiaSemana(dia);
  }
}
