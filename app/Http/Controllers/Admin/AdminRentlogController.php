<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminRentlogController extends Controller
{
    public function index()
    {
        $peminjaman = Peminjaman::with(['user', 'book'])->get();
        return Inertia::render('Admin/RentlogAdmin', [
            'peminjaman' => $peminjaman,
        ]);
    }
}
