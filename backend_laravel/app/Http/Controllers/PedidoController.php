<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $pedidos = Pedido::where('fecha', 'like', "%".$request->q."%")
                            ->with(["productos", "cliente"])
                            ->orderBy('id', 'desc')
                            ->paginate(10);
        return response()->json($pedidos, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "cliente_id" => "required",
            "detalle_pedido" => "required"
        ]);

        try {
            DB::beginTransaction();

            $pedido = new Pedido();
            $pedido->cliente_id = $request->cliente_id;
            $pedido->observacion = $request->observacion;
            $pedido->fecha = date("Y-m-d H:i:s");
            $pedido->estado = isset($request->estado)?$request->estado:false;
            $pedido->save();

            foreach ($request->detalle_pedido as $producto) {
                $pedido->productos()->attach($producto["producto_id"], ["cantidad" => $producto["cantidad"]]);
            }

            $pedido->estado = true;
            $pedido->update();
            
            DB::commit();
            return response()->json(["mensaje" => "Pedido registrado"], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pedido = Pedido::with(["productos", "cliente"])
                            ->find($id);
        return response()->json($pedido, 200);
    }

    public function funGenerarReporteListaPedidoPDF(Request $request){

        $pedidos = Pedido::where('fecha', 'like', "%".$request->q."%")
                            ->with(["productos", "cliente"])
                            ->orderBy('id', 'desc')
                            ->get();

        // return $pedidos;

        $pdf = Pdf::loadView('pdf.pedidos', ["pedidos" =>$pedidos]);
        $nombrePDF = "pedidos-".date('Y-m-d H:i:s').'.pdf';
        return $pdf->download($nombrePDF);
    }

    public function funGenerarReporteMostrarPedidoPDF($id){

        $pedido = Pedido::with(["productos", "cliente"])
                            ->find($id);

        // return $pedidos;

        $pdf = Pdf::loadView('pdf.mostrar-pedido', ["pedido" =>$pedido]);
        $nombrePDF = "pedido-".date('Y-m-d H:i:s').'.pdf';
        return $pdf->download($nombrePDF);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
