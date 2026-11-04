<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Documents extends Model
{
    protected $fillable = [
        'fileName',
        'status',
        'fileType',
        'fileUrl',
        'fileSize'
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class,'document_id','id');
    }
}