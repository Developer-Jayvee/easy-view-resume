<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Pgvector\Laravel\HasNeighbors;
use Pgvector\Laravel\Vector;

class DocumentChunks extends Model
{
    use HasNeighbors;
    
    protected $table = 'document_chunks';
    protected $fillable = [
        'document_id',
        'content',
        'embedding',
        'metadata',
        'chunk_index'
    ];

    protected $casts = [
        'embedding' => Vector::class
    ];
}
