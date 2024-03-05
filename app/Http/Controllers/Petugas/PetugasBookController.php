<?php

namespace App\Http\Controllers\Petugas;

use App\Models\Category;
use App\Models\Ulasan;
use Inertia\Inertia;
use App\Models\Books;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PetugasBookController extends Controller
{
    public function index()
    {
        $books = Books::with('category')->get();
        // $pageNumber = $books->currentPage();
        // $itemsPerPage = $books->perPage();
        // $startNumber = ($pageNumber - 1) * $itemsPerPage + 1;
        return Inertia::render('Petugas/BookPetugas', [
            'books' => $books,
            // 'startNumber' => $startNumber,
        ]);
    }
    public function addBook()
    {
        $categories = Category::all();
        return Inertia::render('Petugas/AddBookPetugas', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'judul' => 'required|string',
            'cover' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'penulis' => 'required|string',
            'penerbit' => 'required|string',
            'tahunTerbit' => 'required|string',
            'category_id' => 'required|string',
            'jumlahHalaman' => 'required|string',
            'bahasa' => 'required|string',
            'deskripsi' => 'required|string',
            'content' => 'file|mimes:pdf',
        ]);

        if ($request->hasFile('cover')) {
            $imagePath = $request->file('cover')->store('images', 'public');
            $cover = $imagePath;
        }

        if ($request->hasFile('content')) {
            $pdfPath = $request->file('content')->store('books', 'public');
            $content = $pdfPath;
        }

        Books::create([
            'judul' => $request->judul,
            'cover' => $cover,
            'penulis' => $request->penulis,
            'penerbit' => $request->penerbit,
            'tahunTerbit' => $request->tahunTerbit,
            'category_id' => $request->category_id,
            'jumlahHalaman' => $request->jumlahHalaman,
            'bahasa' => $request->bahasa,
            'deskripsi' => $request->deskripsi,
            'content' => $content,
        ]);

        return redirect()->route('petugas-book');
    }

    public function destroy($id)
    {
        Ulasan::where('books_id', $id)->delete();

        // Hapus buku
        Books::find($id)->delete();

        return response()->json(['message' => 'Buku dan ulasan terkait berhasil dihapus']);
    }

    public function editBook($id)
    {
        $book = Books::findOrFail($id);
        $book->cover_path = asset("storage/images/{$book->cover}");
        $categories = Category::all();
        return Inertia::render('Petugas/EditBookPetugas', [
            'book' => $book,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, $id)
    {
        $book = Books::findOrFail($id);

        $request->validate([
            'judul' => 'required|string',
            'cover' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'penulis' => 'required|string',
            'penerbit' => 'required|string',
            'tahunTerbit' => 'required|string',
            'category_id' => 'required|string',
            'jumlahHalaman' => 'required|string',
            'bahasa' => 'required|string',
            'deskripsi' => 'required|string',
            'content' => 'file|mimes:pdf',
        ]);

        // Update data yang tidak berupa file
        $book->update($request->except(['cover', 'content']));

        // Update file cover jika ada
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('images', 'public');
            $book->cover = $coverPath;
        }

        // Update file content jika ada
        if ($request->hasFile('content')) {
            $contentPath = $request->file('content')->store('books', 'public');
            $book->content = $contentPath;
        }

        $book->save();

        return redirect()->route('petugas-book')->with('success', 'Book updated successfully!');
    }



}
