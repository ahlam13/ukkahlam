<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Books;
use Inertia\Controller;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class PeminjamanCotroller extends Controller
{
    public function store(Books $book)
    {
        $user = auth()->user();



        $tanggalPeminjaman = now();
        $tanggalPengembalian = now()->addDays(5);

        $dataPeminjaman = [
            'user_id' => $user->id,
            'book_id' => $book->id,
            'tanggalPeminjaman' => $tanggalPeminjaman,
            'tanggalPengembalian' => $tanggalPengembalian,
        ];

        $peminjaman = Peminjaman::create($dataPeminjaman);

        return Inertia::location(route('detailbook', [
            'id' => $book->id,
            'peminjaman', $peminjaman,
        ]));
    }

    public function getBookData($id)
    {
        $book = Peminjaman::where('book_id', $id)
            ->orderBy('created_at', 'desc')
            ->first()
            ->book;

        return Inertia::render('DetailBook', [
            'auth' => Auth::user(),
            'books' => $book,
            'reviews' => $book->reviews,
            'peminjaman' => $book->peminjaman,
        ]);
    }

    public function kembalikan($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);

        // Menghapus peminjaman dari database
        $peminjaman->delete();

        // Mengirimkan null ke halaman detailbook setelah buku dikembalikan
        return Inertia::location(route('detailbook', [
            'id' => $peminjaman->book->id,
            'peminjaman' => null,
        ]));
    }

}
