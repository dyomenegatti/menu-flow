<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class CepController extends Controller
{
    public function show(string $cep) 
    {
        $cep = preg_replace('/\D/', '', $cep);

        if(strlen($cep) !== 8) {
            return response()->json([
                'message' => 'CEP inválido.'
            ], 422);
        }

        $response = Http::get("https://viacep.com.br/ws/{$cep}/json/");

        if($response->failed()) {
            return response()->json([
                'message' => 'Não foi possível consultar o CEP.'
            ], 502);
        }

        $data = $response->json();

        if(isset($data['erro']) && $data['erro'] === true) {
            return response()->json([
                'message' => 'CEP não encontrado.'
            ], 404);
        }

        return response()->json($data);
    }
}
