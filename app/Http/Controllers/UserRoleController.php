<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\{Role,Permission,UserRole};

class UserRoleController extends Controller
{
    //

    public function index(){
        $roles = Role::get();
        return Inertia::render('Frontend/UserManagement/CreateRole',[
            "roles"=>$roles
        ]);
    }

    public function create(Request $request){
        $validated = $request->validate([
            'name'=>'required|unique:roles|max:50',
            'description'=>"nullable|max:250"
        ]);

        Role::create($validated);

            
        return redirect()->route('user.role')->with('success', 'Role Created Successfully Successfully.');

    }

    public function perm_index(){
        $permissions = Permission::get();
        return Inertia::render('Frontend/UserManagement/CreatePermission',[
            "permissions"=>$permissions
        ]);
    }

    public function perm_create(Request $request){
        $validated = $request->validate([
            'name'=>'required|unique:roles|max:50',
            'description'=>"nullable|max:250"
        ]);

        Permission::create($validated);

            
        return redirect()->route('user.permission')->with('success', 'Role Created Successfully Successfully.');

    }


    public function assignRoleToUser(Request $request)
{
    // Create a new UserRole entry

    $messages = [
        'user_id.unique' => 'This user already has the selected role.',
    ];

    // Validate the request data with custom error messages
    $request->validate([
        'user_id' => 'required|exists:users,id|unique:user_roles,user_id,NULL,id,role_id,' . $request->role_id,
        'role_id' => 'required|exists:roles,id',
    ], $messages);


     $userRole = UserRole::create([
        'user_id' => $request->user_id,
        'role_id' => $request->role_id,
    ]);

    return response()->json(['message' => 'Role assigned successfully!', 'data' => $userRole], 200);
}
}
