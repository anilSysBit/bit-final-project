<?php

namespace App\Enums;

enum GenderEnum: string
{
    case MALE = 'male';
    case FEMALE = 'female';
    case OTHER = 'other';

    public static function toArray(): array
    {
        return array_column(self::cases(), 'value');
    }
}