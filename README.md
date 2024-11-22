
# Backend en Nest

```docker
docker compose up -d
```

Copiar el ```.env.template``` y renombrarlo a ```.env```

Ejemplos de Requests

- Crear un Pedido

URL: POST ```http://localhost:3000/pedidos```
Body:

```json
{
  "nombreCliente": "Juan Pérez",
  "direccion": "Calle Falsa 123",
  "telefono": "555-1234",
  "fechaCompra": "2024-11-22",
  "pizzas": [
    {
      "tamano": "Grande",
      "ingredientes2": ["Queso", "Pepperoni"],
      "cantidad": 2,
      "subtotal": 20.0
    }
  ],
  "total": 20.0
}
```

- Obtener Todos los Pedidos

URL: GET ```http://localhost:3000/pedidos```

- Obtener un Pedido por ID

URL: GET ```http://localhost:3000/pedidos/{id}```

- Eliminar un Pedido

URL: DELETE ```http://localhost:3000/pedidos/{id}```

- Obtener Ventas por Día de la Semana

URL: GET ```http://localhost:3000/pedidos/ventas/dia?dia=Lunes```
