<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;

class AdminPetugasController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'petugas')->get();
        $totalUser = $users->count();

        return Inertia::render('Admin/PetugasAdmin', [
            'users' => $users,
            'totalUser' => $totalUser,
        ]);
    }
    public function view()
    {
        $users = User::where('role', 'user')->get();

        return Inertia::render('Petugas/UserPetugas', [
            'users' => $users,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => 'required|string|max:255',
        ]);

        $defaultFields = [
            'alamat' => "alamat",
            'role' => 'petugas'
        ];

        $userData = $request->only(['nama', 'email', 'password']);

        $userData = array_merge($userData, $defaultFields);

        $userData['username'] = "petugas" . rand();

        User::create([
            'nama' => $userData['nama'],
            'username' => $userData['username'],
            'alamat' => $userData['alamat'],
            'email' => $userData['email'],
            'password' => Hash::make($userData['password']),
            'role' => $userData['role'],
        ]);

        return back()->with('status', 'Petugas berhasil ditambah');
    }

    public function destroy($id)
    {
        User::find($id)->delete();

        return response()->json(['message' => 'Data berhasil dihapus']);
    }

}
