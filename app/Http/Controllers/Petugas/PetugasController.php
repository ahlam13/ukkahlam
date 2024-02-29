<?php

namespace App\Http\Controllers\Petugas;

use App\Models\Peminjaman;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Books;
use App\Models\Category;
use App\Models\Bookmarks;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PetugasController extends Controller
{
    public function index()
    {
        $category = Category::all();
        $totalCategory = $category->count();
        $users = User::where('role', 'user')->get();
        $totalUser = $users->count();
        $books = Books::all();
        $totalBook = $books->count();
        $petugas = User::where('role', 'petugas')->get();
        $peminjaman = Peminjaman::with(['user', 'book'])->get();

        return Inertia::render('Petugas/DashboardPetugas', [
            'totalCategory' => $totalCategory,
            'totalUser' => $totalUser,
            'totalBook' => $totalBook,
            'petugas' => $petugas,
            'peminjaman' => $peminjaman,
        ]);
    }
}
