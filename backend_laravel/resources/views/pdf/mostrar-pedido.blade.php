<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Pedido</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }

        .report-container {
            background-color: white;
            width: 80%;
            margin: auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        header {
            text-align: center;
            margin-bottom: 30px;
        }

        header h1 {
            font-size: 24px;
            color: #333;
        }

        header p {
            font-size: 14px;
            color: #555;
        }

        .order-details {
            margin-bottom: 30px;
        }

        .order-details h2 {
            font-size: 20px;
            color: #333;
            margin-bottom: 15px;
            border-bottom: 2px solid #e1e1e1;
            padding-bottom: 5px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        table th, table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        table th {
            background-color: #f7f7f7;
            font-weight: bold;
        }

        .summary {
            margin-top: 30px;
        }

        .summary h3 {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
        }

        .summary p {
            font-size: 14px;
            color: #555;
        }

        footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #555;
        }
    </style>
</head>
<body>
    
        <div class="report-container">
            <header>
                <h1>Reporte de Pedido</h1>
                @if($pedido->cliente)
                <p><strong>Cliente:</strong> {{ $pedido->cliente->nombre_completo }}</p>
                <p><strong>Correo:</strong> {{ $pedido->cliente->correo }}</p>
                <p><strong>CI:</strong> {{ $pedido->cliente->ci }}</p>
                <p><strong>Fecha del Pedido:</strong> {{ \Carbon\Carbon::parse($pedido->fecha)->format('d-m-Y H:i:s') }}</p>
                @endif
            </header>
            
            <section class="order-details">
                <h2>Detalles del Pedido</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($pedido->productos as $producto)
                            <tr>
                                <td>{{ $producto->nombre }}</td>
                                <td>{{ $producto->descripcion }}</td>
                                <td>{{ $producto->pivot->cantidad }}</td>
                                <td>${{ number_format($producto->precio, 2) }}</td>
                                <td>${{ number_format($producto->pivot->cantidad * $producto->precio, 2) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </section>
            
            <section class="summary">
                <h3>Resumen</h3>
                <p><strong>Total de Productos:</strong> {{ $pedido->productos->sum('pivot.cantidad') }}</p>
                <p><strong>Total del Pedido:</strong> ${{ number_format($pedido->productos->sum(function($producto) {
                    return $producto->pivot->cantidad * $producto->precio;
                }), 2) }}</p>
            </section>

            <footer>
                <p><strong>Observación:</strong> {{ $pedido->observacion }}</p>
            </footer>
        </div>
</body>
</html>
