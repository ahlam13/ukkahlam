<?php

namespace App\Http\Controllers\Petugas;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PetugasUserController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'user')->get();
        $totalUser = $users->count();

        return Inertia::render('Petugas/UserPetugas', [
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
    public function listblock()
    {
        return Inertia::render('Petugas/ListBlockPetugas');
    }

    public function getUser($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }
}
