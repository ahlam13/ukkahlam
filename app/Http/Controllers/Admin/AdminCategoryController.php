<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('Admin/CategoryAdmin', [
            'categories' => $categories,
        ]);
    }
    public function add()
    {
        $categories = Category::all();

        return Inertia::render('../Components/CategoryLog', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama' => 'required|string|max:255',

        ]);

        Category::create([
            'nama' => $request->nama,
        ]);


        return back()->with('status', 'Kategori berhasil ditambah');
    }

    public function destroy($id)
    {
        Category::find($id)->delete();

        return response()->json(['message' => 'Data berhasil dihapus']);
    }

    public function editCategory($id)
    {
        $category = Category::findOrFail($id);
        return Inertia::render('Admin/EditCategoryAdmin', [
            'category' => $category,

        ]);
    }
}
