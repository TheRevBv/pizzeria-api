import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedido, PedidoDocument } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto';
import { Pizza, PizzaDocument } from '../pizza/entities/pizza.entity';
import { CreatePizzaDto } from '../pizza/dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido.name) private pedidoModel: Model<PedidoDocument>,
    @InjectModel(Pizza.name) private pizzaModel: Model<PizzaDocument>,
  ) {}

  async findAll(): Promise<Pedido[]> {
    return this.pedidoModel.find().populate('pizzas').exec();
  }

  async findOne(id: string): Promise<Pedido> {
    const pedido = await this.pedidoModel
      .findById(id)
      .populate('pizzas')
      .exec();
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return pedido;
  }

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const createdPizzas = await Promise.all(
      createPedidoDto.pizzas.map(async (pizzaDto: CreatePizzaDto) => {
        const createdPizza = new this.pizzaModel(pizzaDto);
        return await createdPizza.save();
      }),
    );

    const total = createdPizzas.reduce((acc, pizza) => acc + pizza.subtotal, 0);

    const createdPedido = new this.pedidoModel({
      ...createPedidoDto,
      pizzas: createdPizzas.map((pizza) => pizza._id),
      total: total,
    });

    return createdPedido.save();
  }

  async remove(id: string): Promise<void> {
    const pedido = await this.pedidoModel.findById(id).exec();
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    await this.pizzaModel.deleteMany({ _id: { $in: pedido.pizzas } }).exec();
    await this.pedidoModel.findByIdAndDelete(id).exec();
  }

  async findVentasPorDiaSemana(dia: string): Promise<Pedido[]> {
    const diasDeLaSemana = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];
    const diaLower = dia.toLowerCase();
    const indiceDia = diasDeLaSemana.indexOf(diaLower);

    if (indiceDia === -1) {
      return [];
    }

    // Obtener la lista de pedidos cuyo día de la semana coincide
    const pedidos = await this.pedidoModel.find().populate('pizzas').exec();
    return pedidos.filter((pedido) => {
      const fecha = new Date(pedido.fechaCompra);
      return fecha.getDay() + 1 === indiceDia;
    });
  }
}
