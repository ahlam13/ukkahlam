<?php

namespace App\Http\Controllers;

use App\Models\Bookmarks;
use App\Models\Books;
use App\Models\Category;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookMarkController extends Controller
{
    //
    public function show()
    {
        $user = auth()->user();
        $bookmarks = Bookmarks::where('user_id', $user->id)->with('book')->get();
        $peminjaman = Peminjaman::where('user_id', $user->id)->with('book')->get();

        return Inertia::render('BookMark', [
            'bookmarks' => $bookmarks,
            'peminjaman' => $peminjaman,
        ]);
    }

    public function bookmark($id)
    {
        $book = Books::find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $user = auth()->user();

        $existingBookmark = Bookmarks::where('book_id', $book->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existingBookmark) {
            $existingBookmark->delete();
            return redirect()->back();
        } else {
            $bookmark = new Bookmarks();
            $bookmark->book_id = $book->id;
            $bookmark->user_id = $user->id;
            $bookmark->save();

            return redirect()->back();
        }
    }

    public function checkBookmark($book_id)
    {
        $book = Books::findOrFail($book_id);
        $isBookmarked = $book->getIsBookmarkedAttribute();

        return response()->json(['isBookmarked' => $isBookmarked]);
    }
    public function checkPeminjamanBookmark($book_id)
    {
        $buku = Books::findOrFail($book_id);
        $isBookmarked = $buku->getIsBookmarkedAttribute();

        return response()->json(['isBookmarked' => $isBookmarked]);
    }

    public function category($id)
    {
        $category = Category::find($id);
        $books = Books::where('category_id', $id)->get();
        
        return Inertia::render('CategoryBook', [
            'books' => $books,
            'category'=> $category,
        ]);
    }
}
