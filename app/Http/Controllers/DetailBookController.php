<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use App\Models\Ulasan;
use Inertia\Inertia;
use App\Models\Books;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;

class DetailBookController extends Controller
{
    public function index($id)
    {
        $books = $this->getBook($id);
        $reviews = $this->getReviews($books);
        $peminjaman = $this->getPeminjaman($books);
        $averageRating = round(Ulasan::where('books_id', $books->id)->avg('rating'));

        return Inertia::render('DetailBook', [
            'books' => $books,
            'reviews' => $reviews,
            'peminjaman' => $peminjaman,
            'averageRating' => $averageRating,
        ]);
    }
    public function getPeminjaman($books)
    {
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

    public function read($id)
    {
        $books = Books::findOrFail($id);
        $file = public_path("/storage/" . $books->content);
        return Response::make(file_get_contents($file), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename=richdad.pdf',
        ]);
        // return Inertia::render('PdfBook', [
        //     'file' => $file,
        // ]);
    }
}
