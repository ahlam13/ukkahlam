<?php

use App\Http\Controllers\Admin\AdminBookController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminPetugasController;
use App\Http\Controllers\Admin\AdminRentlogController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\PeminjamanCotroller;
use App\Http\Controllers\UlasanController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookMarkController;
use App\Http\Controllers\DetailBookController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\Petugas\PetugasController;
use App\Http\Controllers\Petugas\PetugasBookController;
use App\Http\Controllers\Petugas\PetugasUserController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Petugas\PetugasRentlogController;
use App\Http\Controllers\Petugas\PetugasCategoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin-dashboard', [AdminDashboardController::class, 'index'])->name('admin-dashboard');
    Route::get('/admin-book', [AdminBookController::class, 'index'])->name('admin-book');
    Route::post('/admin-book/addbook', [AdminBookController::class, 'store'])->name('admin-book.store');
    Route::get('/admin-book/addbook', [AdminBookController::class, 'addBook'])->name('admin-addbook');
    Route::get('/admin-book/editbook/{id}', [AdminBookController::class, 'editBook'])->name('admin-editbook');
    Route::put('/admin-book/updatebook/{id}', [AdminBookController::class, 'update'])->name('updatebook');
    Route::delete('/admin-book/{id}', [AdminBookController::class, 'destroy']);
    Route::get('/admin-category', [AdminCategoryController::class, 'index'])->name('admin-category');
    Route::get('/admin-category/editcategory', [AdminCategoryController::class, 'editCategory'])->name('admin-editcategory');
    Route::post('admin-category/addcategory', [AdminCategoryController::class, 'store'])
        ->name('addcategoryAdmin');
    Route::delete('/admin-category/{id}', [AdminCategoryController::class, 'destroy']);
    Route::get('/admin-user', [AdminUserController::class, 'index'])->name('admin-user');
    Route::get('/petugas-user/{id}', [PetugasUserController::class, 'view'])->name('petugas-viewuser');
    Route::delete('/admin-user/{id}', [AdminUserController::class, 'destroy']);
    Route::get('/admin-petugas', [AdminPetugasController::class, 'index'])->name('admin-petugas');
    Route::delete('/admin-petugas/{id}', [AdminPetugasController::class, 'destroy']);
    Route::post('admin-category/addcategory', [AdminPetugasController::class, 'store'])
        ->name('addpetugas');
    Route::get('/petugas-user/listblock', [PetugasUserController::class, 'listblock'])->name('petugas-listblock');
    Route::get('/admin-rentlog', [AdminRentlogController::class, 'index'])->name('admin-rentlog');
    Route::get('/admin-printpeminjaman', [AdminDashboardController::class, 'print'])->name('admin-print');
});

Route::middleware(['auth', 'role:petugas'])->group(function () {
    Route::get('/petugas-dashboard', [PetugasController::class, 'index'])->name('petugas-dashboard');
    Route::get('/petugas-book', [PetugasBookController::class, 'index'])->name('petugas-book');
    Route::post('/petugas-book/addbook', [PetugasBookController::class, 'store'])->name('petugas-book.store');
    Route::get('/petugas-book/addbook', [PetugasBookController::class, 'addBook'])->name('petugas-addbook');
    Route::get('/petugas-book/editbook/{id}', [PetugasBookController::class, 'editBook'])->name('petugas-editbook');
    Route::put('/petugas-book/updatebook/{id}', [PetugasBookController::class, 'update'])->name('updatebook');
    Route::delete('/petugas-book/{id}', [PetugasBookController::class, 'destroy']);
    Route::get('/petugas-category', [PetugasCategoryController::class, 'index'])->name('petugas-category');
    Route::post('petugas-category/addcategory', [PetugasCategoryController::class, 'store'])
        ->name('addcategory');
    Route::delete('/petugas-category/{id}', [PetugasCategoryController::class, 'destroy']);
    Route::get('/petugas-user', [PetugasUserController::class, 'index'])->name('petugas-user');
    Route::get('/petugas-user/{id}', [PetugasUserController::class, 'view'])->name('petugas-viewuser');
    Route::get('/petugas-user/listblock', [PetugasUserController::class, 'listblock'])->name('petugas-listblock');
    Route::get('/petugas-rentlog', [PetugasRentlogController::class, 'index'])->name('petugas-rentlog');
    Route::get('/petugas-printpeminjaman', [PetugasRentlogController::class, 'print'])->name('petugas-print');

});

Route::get('/get-user/{id}', [PetugasUserController::class, 'getUser'])->name('petugas-getUser');

Route::middleware(['auth', 'role:user'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile', [ProfileController::class, 'uploadImage'])->name('profile.photo');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::post('/bookmarks/{id}', [BookMarkController::class, 'bookmark'])->name('bookmark');
});

Route::get('/check-bookmark/{book_id}', [BookmarkController::class, 'checkBookmark']);
Route::get('/check-peminjamanbookmark/{book_id}', [BookmarkController::class, 'checkPeminjamanBookmark']);

Route::middleware('auth')->group(function () {
    Route::get('/bookmark', [BookMarkController::class, 'show'])->name('bookmark');
    Route::post('/ulasan/{book}', [UlasanController::class, 'store'])->name('ulasan.store');
    Route::delete('/ulasan/{id}', [UlasanController::class, 'destroy'])->name('ulasan.delete');
    Route::post('/peminjaman/{book}', [PeminjamanCotroller::class, 'store'])->name('peminjaman.store');
    Route::get('/books/{id}/get-data', [PeminjamanCotroller::class, 'getBookData'])->name('book.get-data');
    Route::put('/peminjaman/{id}/kembalikan', [PeminjamanCotroller::class, 'kembalikan'])->name('peminjaman.kembalikan');
});

Route::middleware('auth')->group(function () {
    Route::get('/detailbook/{id}', [DetailBookController::class, 'index'])->name('detailbook');
    Route::get('/read/{id}', [DetailBookController::class, 'read'])->name('read');
});


require __DIR__ . '/auth.php';
