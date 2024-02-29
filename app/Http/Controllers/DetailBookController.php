<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use Inertia\Inertia;
use App\Models\Books;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DetailBookController extends Controller
{
    public function index($id)
    {
        $books = $this->getBook($id);
        $reviews = $this->getReviews($books);
        $peminjaman = $this->getPeminjaman($books);

        return Inertia::render('DetailBook', [
            'books' => $books,
            'reviews' => $reviews,
            'peminjaman' => $peminjaman,
        ]);
    }
    public function getPeminjaman($books)
    {
        // Mengambil informasi peminjaman terkait buku untuk pengguna yang sedang login
        $user = auth()->user();

        $peminjaman = Peminjaman::where('user_id', $user->id)
            ->where('book_id', $books->id)
            ->first();

        return $peminjaman;
    }

    protected function getBook($id)
    {
        return Books::findOrFail($id);
    }

    protected function getReviews($books)
    {
        return $books->reviews->load('user');
    }

}
