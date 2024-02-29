<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Books;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminBookController extends Controller
{
    public function index()
    {
        $books = Books::paginate(3);
        $pageNumber = $books->currentPage();
        $itemsPerPage = $books->perPage();
        $startNumber = ($pageNumber - 1) * $itemsPerPage + 1;
        return Inertia::render('Admin/BookAdmin', [
            'books' => $books,
            'startNumber' => $startNumber,
        ]);
    }
    public function addBook()
    {
        return Inertia::render('Petugas/AddBookPetugas');
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string',
            'cover' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'penulis' => 'required|string',
            'penerbit' => 'required|string',
            'tahunTerbit' => 'required|string',
            'kategori' => 'required|string',
            'jumlahHalaman' => 'required|string',
            'bahasa' => 'required|string',
            'deskripsi' => 'required|string',
        ]);

        if ($request->hasFile('cover')) {
            $imagePath = $request->file('cover')->store('images', 'public');
            $cover = $imagePath;
        }

        Books::create([
            'judul' => $request->judul,
            'cover' => $cover,
            'penulis' => $request->penulis,
            'penerbit' => $request->penerbit,
            'tahunTerbit' => $request->tahunTerbit,
            'kategori' => $request->kategori,
            'jumlahHalaman' => $request->jumlahHalaman,
            'bahasa' => $request->bahasa,
            'deskripsi' => $request->deskripsi,
        ]);

        return redirect()->route('petugas-book');
    }

    public function editBook()
    {
        return Inertia::render('Petugas/EditBookPetugas');
    }
}
