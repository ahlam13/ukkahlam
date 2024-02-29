<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Books extends Model
{
    use HasFactory;

    protected $table = "books";
    protected $fillable = [
        'judul',
        'cover',
        'penulis',
        'penerbit',
        'tahunTerbit',
        'kategori',
        'jumlahHalaman',
        'bahasa',
        'deskripsi'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'bookmarks');
    }
    protected $appends = ['is_bookmarked'];

    public function getIsBookmarkedAttribute()
    {
        return $this->bookmarks->contains(auth()->id());
    }

    public function isBorrowed()
    {
        return $this->peminjaman()->where('statusPeminjaman', 'Dipinjam')->exists();
    }
    public function setPeminjamanStatus($status)
    {
        $this->update(['statusPeminjaman' => $status]);
    }
    public function bookmark()
    {
        return $this->hasOne(Bookmarks::class, 'book_id', 'id');
    }
    public function bookmarks()
    {
        return $this->belongsToMany(User::class, 'bookmarks', 'book_id', 'user_id');
    }

    public function reviews()
    {
        return $this->hasMany(Ulasan::class);
    }
    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class, 'book_id', 'id');
    }
}
