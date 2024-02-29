<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookmarks extends Model
{
    use HasFactory;
    protected $table = "bookmarks";
    protected $fillable = [
        'user_id',
        'book_id',
        'status',
    ];

    public function book()
    {
        return $this->belongsTo(Books::class);
    }
}
