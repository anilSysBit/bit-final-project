<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BloodRequest extends Model
{
    use HasFactory;
    protected $table = 'blood_request';


    protected $fillable = [
        'user_id',
        'patient_name',
        'phone',
        'requestor_same_as_patient',
        'requestor_name',
        'requestor_phone',
        'address',
        'hospital_name',
        'blood_group',
        'quantity',
        'other',
        'hospital_referral',
        'status',
        'required_date',
        'required_time',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
