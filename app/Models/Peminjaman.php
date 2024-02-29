<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;
    protected $table = 'peminjaman';

    protected $fillable = [
        'user_id',
        'book_id',
        'tanggalPeminjaman',
        'tanggalPengembalian',
        'statusPeminjaman'
    ];

    protected $appends = ['is_bookmarked'];

    public function getIsBookmarkedAttribute()
    {
        return $this->bookmarks->contains(auth()->id());
    }
    public function bookmark()
    {
        return $this->hasOne(Bookmarks::class, 'book_id', 'id');
    }

    public function bookmarks()
    {
        return $this->belongsToMany(User::class, 'bookmarks', 'book_id', 'user_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Books::class);
    }
}
