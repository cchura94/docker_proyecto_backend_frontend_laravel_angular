<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?? 10;

        if(isset($request->q)){
            $productos = Producto::orderBy('id', 'desc')
                ->where('nombre', 'like', "%$request->q%")
                ->orWhere('precio', 'like', "%$request->q%")
                ->with(['categoria'])
                ->paginate($limit);
            return response()->json($productos, 200);
        }else{
            $productos = Producto::orderBy('id', 'desc')->with(['categoria'])->paginate($limit);
            return response()->json($productos, 200);
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validacion
        $request->validate([
            'nombre' => 'required|string|max:200',
            //'precio' => 'numeric',
            'categoria_id' => 'required|numeric',
            'stock' => 'numeric'
        ]);

        // guardar
        $producto = new Producto();
        $producto->nombre = $request->nombre;
        $producto->precio = $request->precio;
        $producto->categoria_id = $request->categoria_id;
        $producto->stock = $request->stock;
        $producto->descripcion = $request->descripcion;
        // subir imagen

        if($file = $request->file('imagen')){
            $direccion_url = time() . "-". $file->getClientOriginalName();
            $file->move('imagenes', $direccion_url);
            $producto->imagen = 'imagenes/'.$direccion_url;
        }

        $producto->save();

        // respuesta

        return response()->json([
            'message' => 'Producto creado con éxito'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $producto = Producto::find($id);
        return response()->json($producto, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // validacion
        $request->validate([
            'nombre' => 'required|string|max:200',
            'precio' => 'numeric',
            'categoria_id' => 'required|numeric',
            'stock' => 'numeric'
        ]);

        // modificar
        $producto = Producto::find($id);
        $producto->nombre = $request->nombre;
        $producto->precio = $request->precio;
        $producto->categoria_id = $request->categoria_id;
        $producto->stock = $request->stock;
        $producto->descripcion = $request->descripcion;
        // subir imagen

        if($file = $request->file('imagen')){
            $direccion_url = time() . "-". $file->getClientOriginalName();
            $file->move('imagenes', $direccion_url);
            $producto->imagen = 'imagenes/'.$direccion_url;
        }

        $producto->update();

        // respuesta

        return response()->json([
            'message' => 'Producto actualizado con éxito'
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $producto = Producto::find($id);
       //  $producto->delete();
        return response()->json([
            'message' => 'Producto eliminado con éxito'
        ], 200);
    }
}
