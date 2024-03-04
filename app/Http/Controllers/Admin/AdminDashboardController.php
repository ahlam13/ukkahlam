<?php

namespace App\Http\Controllers\Admin;

use App\Models\Books;
use App\Models\Category;
use App\Models\Peminjaman;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $category = Category::all();
        $totalCategory = $category->count();
        $users = User::where('role', 'user')->get();
        $totalUser = $users->count();
        $books = Books::all();
        $totalBook = $books->count();
        $peminjaman = Peminjaman::with(['user', 'book'])->get();

        return Inertia::render('Admin/DashboardAdmin', [
            'totalCategory' => $totalCategory,
            'totalUser' => $totalUser,
            'totalBook' => $totalBook,
            'peminjaman' => $peminjaman,
        ]);
    }
    public function print()
    {
        $peminjaman = Peminjaman::with(['user', 'book'])->get();
        return Inertia::render('Petugas/PrintPeminjaman', [
            'peminjaman' => $peminjaman,
        ]);
    }
}
