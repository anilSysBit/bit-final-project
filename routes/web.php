<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BloodRequestController;
use App\Http\Controllers\UserRoleController;
use App\Models\{BloodRequest,User};
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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
    Route::get('edit/{id}',[BloodRequestController::class,'edit'])->name('blood.edit');
    Route::patch('edit/{id}',[BloodRequestController::class,'update'])->name('blood.update');
    Route::patch('status/{id}',[BloodRequestController::class,'changeStatus'])->name('blood.status');
    Route::delete('list/{id}',[BloodRequestController::class,'destroy'])->name('blood.delete')->middleware("auth.admin");
});

Route::get('/users',function(){


    return Inertia::render('Frontend/User/List',[
        'userData'=>User::paginate(10),
    ]);
})->name('users');

Route::get('/users/{id}',function($id){
    $user_data = User::findOrFail($id);
    return Inertia::render('Frontend/User/Details',[
        'userData'=> $user_data
    ]);
});

Route::get('/my-requests',[BloodRequestController::class,'user'])->name('myrequests');


Route::get('/role', [UserRoleController::class,'index'])->name("role");
Route::post('/role', [UserRoleController::class,'create'])->name("user.role");
Route::get('/permission', [UserRoleController::class,'perm_index'])->name("permission");
Route::post('/permission', [UserRoleController::class,'perm_create'])->name("user.permission");



require __DIR__.'/auth.php';
