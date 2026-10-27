<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentChunks extends Model
{
    protected $table = 'document_chunks';
    protected $fillable = [
        'document_id',
        'content',
        'embedding',
        'metadata',
        'chunk_index'
    ];
}
