<?php

namespace App\Http\Controllers;

use App\Models\Books;
use App\Models\Ulasan;
use Illuminate\Http\Request;

class UlasanController extends Controller
{
    public function store(Request $request, Books $book)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'ulasan' => 'required|string|max:255',
        ]);

        $user = auth()->user();

        // Membuat ulasan baru
        $ulasan = new Ulasan([
            'user_id' => $user->id,
            'books_id' => $book->id,
            'rating' => $request->input('rating'),
            'ulasan' => $request->input('ulasan'),
        ]);

        $ulasan->save();

        return redirect()->back()->with('success', 'Ulasan berhasil ditambahkan');
    }
    public function destroy($id)
    {
        Ulasan::find($id)->delete();

        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
