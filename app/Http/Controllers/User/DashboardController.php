<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Books;
use App\Models\Bookmarks;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;

class DashboardController extends Controller
{
    public function index()
    {
        $latestBooks = Books::latest()->take(3)->get();
        $randomBooks = Books::inRandomOrder()->take(6)->get();
        $books = Books::all();
        $category = Category::all();

        return Inertia::render('Dashboard', [
            'latestBooks' => $latestBooks,
            'randomBooks' => $randomBooks,
            'books' => $books,
            'category' => $category,
        ]);
    }
}
