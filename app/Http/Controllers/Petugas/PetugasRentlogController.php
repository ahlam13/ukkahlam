<?php

namespace App\Http\Controllers\Petugas;

use App\Models\Peminjaman;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PetugasRentlogController extends Controller
{
    public function index()
    {
        $peminjaman = Peminjaman::with(['user', 'book'])->get();
        return Inertia::render('Petugas/RentlogPetugas', [
            'peminjaman' => $peminjaman,
        ]);
    }
}
