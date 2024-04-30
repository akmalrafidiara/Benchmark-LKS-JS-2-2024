<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Token;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (!auth()->attempt($credentials)) {
            return response()->json(['message' => 'Invalid Login'], 401);
        }

        $generateToken = Str::random(80);
        $generateToken = hash('sha256', $generateToken);

        $token = Token::create([
            'user_id' => auth()->id(),
            'token' => $generateToken
        ]);

        return response()->json($generateToken);
    }

    public function logout()
    {
        $token = Token::where('token', request()->bearerToken())->first();
        $token->delete();

        return response()->json(['message' => 'Logout Success']);
    }
}