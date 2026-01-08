<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;
//use Illuminate\Foundation\Auth\User;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'min:5', 'unique:users,name'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8'],
        ],[
            'name.min' => 'Username must be atleast 5 characters long',
            'name.unique' => 'That username is already taken.',
            'email.unique' => 'This email is already registered.',
            'password.min' => 'Password must be at least 8 characters.'
        ]);

        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => config('recaptcha.secret_key'),
            'response' => $request->input('g-recaptcha-response'),
            'remoteip' => $request->ip(),
        ]);

        $result = $response->json();

        if (! ($result['success'] ?? false)) {
            return back()->withErrors(['captcha' => 'CAPTCHA verification failed']);
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),

            'money' => 0,
            'wood' => 0,
            'stone' => 0,
            'food' => 0,

            'lumber_mill_level' => 0,
            'quarry_level' => 0,
            'farm_level' => 0,

            'achievment_level' => 0,
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'User created',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'name' => ['required'],
            'password' => ['required']
        ]);
    
        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => config('recaptcha.secret_key'),
            'response' => $request->input('g-recaptcha-response'),
            'remoteip' => $request->ip(),
        ]);

        $result = $response->json();

        if (! ($result['success'] ?? false)) {
            return back()->withErrors(['captcha' => 'CAPTCHA verification failed']);
        }
        
        $user = User::where('name', $credentials['name'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Username or password is incorrect'
            ], 401);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out'
        ]);
    }
}
