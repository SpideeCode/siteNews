<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Article;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['nom'];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
