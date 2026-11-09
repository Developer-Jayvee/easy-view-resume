<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Pgvector\Laravel\HasNeighbors;
use Pgvector\Laravel\Vector;

class DocumentChunks extends Model
{
    use HasNeighbors, Searchable;
    
    protected $table = 'document_chunks';
    protected $fillable = [
        'document_id',
        'content',
        'embedding',
        'metadata',
        'chunk_index'
    ];

    protected $hidden = [
        'search_vector', 'search_text'
    ];
    protected $casts = [
        'embedding' => Vector::class
    ];

   
}
