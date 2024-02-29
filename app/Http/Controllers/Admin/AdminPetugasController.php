<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    public function listblock()
    {
        return Inertia::render('Petugas/ListBlockPetugas');
    }
}
