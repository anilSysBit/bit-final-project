<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BloodRequestController;
use App\Models\BloodRequest;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard',[
        'dashboardData'=>[
            'pending' => BloodRequest::where('status','pending')->count(),
            'completed' => BloodRequest::where('status','completed')->count(),
            'cancelled' => BloodRequest::where('status','cancelled')->count(),
            'onprocess' => BloodRequest::where('status','onprocess')->count(),
        ]
    ]);
})->middleware(['auth','auth.admin','verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->prefix('blood')->group(function(){
    Route::get('list',[BloodRequestController::class,'index'])->name('blood.list');
    Route::get('create',[BloodRequestController::class,'create'])->name('blood.create');
    Route::post('store',[BloodRequestController::class,'store'])->name('blood.store');
});

require __DIR__.'/auth.php';
