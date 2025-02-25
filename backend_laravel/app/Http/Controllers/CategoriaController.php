<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $categorias = Categoria::get();

            return response()->json($categorias, 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al listar las categoria',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // validar
        $request->validate([
            'nombre' => 'required|string|max:50'
        ]);
        try {
            // guardar
            $categoria = new Categoria();
            $categoria->nombre = $request->nombre;
            $categoria->detalle = $request->detalle;
            $categoria->save();
            // respuesta
            return response()->json([
                'message' => 'Categoria creada con éxito'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al registrar la categoria',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $categoria = Categoria::find($id);

            if ($categoria) {
                return response()->json($categoria, 200);
            } else {
                return response()->json([
                    'message' => 'Categoria no encontrada'
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener la categoria',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            // validar
            $request->validate([
                'nombre' => 'required|string|max:50'
            ]);
            // modificar
            $categoria = Categoria::find($id);
            $categoria->nombre = $request->nombre;
            $categoria->detalle = $request->detalle;
            $categoria->update();
            // respuesta
            return response()->json([
                'message' => 'Categoria actualizada con éxito'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar la categoria',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categoria = Categoria::findOrFail($id);
        $categoria->estado = false;

        if ($categoria->update()) {
            return response()->json([
                'message' => 'Categoria inactivada con éxito'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Error al eliminar la categoria'
            ], 500);
        }
    }

    public function listaCategoriaPublica(){
        try {
            $categorias = Categoria::where('estado', true)->get();

            return response()->json($categorias, 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al listar las categoria',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
