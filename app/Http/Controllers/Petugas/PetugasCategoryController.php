<?php

namespace App\Http\Controllers\Petugas;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;

class PetugasCategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('Petugas/CategoryPetugas', [
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

}
