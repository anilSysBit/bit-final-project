<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BloodRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;


class BloodRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $bloodRequests = BloodRequest::paginate(10);
        return Inertia::render('Frontend/Blood/List',[
            'blood_requests' => $bloodRequests,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Frontend/Blood/Create',[
            'genderOptions' => ['male','female','others'],
            'bloodOptions'=>['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): RedirectResponse
    {
            $validated = $request->validate([
                'user_id'=>'nullable',
                'patient_name' => 'required|string|max:255',
                'phone'=> 'required|string',
                'address'=> 'required|string|max:255',
                'hospital_name'=> 'required|string|max:255',
                'quantity'=> 'required|min:1|max:5|numeric',
                'gender'=>'required|string|max:100',
                'blood_group'=>'required|string|max:10',
                'other'=> 'nullable|string|max:1000',
                'required_date'=>'required|date',
                'hospital_referral'=>'nullable|file|mimes:jpeg,png,jpg|max:2048'
            ]);

            

            if($request->hasFile('hospital_referral')){
                $file = $request->file('hospital_referral');
                $fileExtension = $file->getClientOriginalExtension();
                $now = date('YmdHis');
                $username = explode(' ',Auth::user()->name)[0];
                $filename = $now . strtolower($username). ".".$fileExtension;

                $file->move('uploads/referrals',$filename);

                
            }
            $validated['user_id'] = Auth::id();



            // BloodRequest::create($validated);
            return redirect()->route('blood.create')->with('success', 'Blood request created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
