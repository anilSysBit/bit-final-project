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
    public $constants = array(
        'genderOptions' => ['male','female','others'],
        'bloodOptions'=>['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        'timeOptions'=>[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,],
    );

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
            'constants'=> $this->constants
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
                'required_time'=>'required|time',
                'hospital_referral'=>'nullable|file|mimes:jpeg,png,jpg|max:2048'
            ]);

            

            if($request->hasFile('hospital_referral')){
                $file = $request->file('hospital_referral');
                $fileExtension = $file->getClientOriginalExtension();
                $now = date('YmdHis');
                $username = explode(' ',Auth::user()->name)[0];
                $filename = $now . strtolower($username). ".".$fileExtension;
                $path = $file->move('uploads/referrals',$filename);
                $validated['hospital_referral'] = $path;
                
            }
            $validated['user_id'] = Auth::id();



            BloodRequest::create($validated);
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
        
        return Inertia::render('Frontend/Blood/Create',[
            'constants'=> $this->constants,
            'prevData'=>BloodRequest::findOrFail($id),
        ]);
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
        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'phone'=> 'required|string',
            'address'=> 'required|string|max:255',
            'hospital_name'=> 'required|string|max:255',
            'quantity'=> 'required|min:1|max:5|numeric',
            'gender'=>'required|string|max:100',
            'blood_group'=>'required|string|max:10',
            'other'=> 'nullable|string|max:1000',
            'required_date'=>'required|date',
            'required_time'=>'required|time',
            'hospital_referral'=>'sometimes|file|mimes:jpeg,png,jpg|max:2048'
        ]);
        $bloodRequest = BloodRequest::findOrFail($id);

        if($request->hasFile('hospital_referral')){
            if ($bloodRequest->hospital_referral && file_exists(public_path($bloodRequest->hospital_referral))) {
                unlink(public_path($bloodRequest->hospital_referral));
            }

            
            $file = $request->file('hospital_referral');
            $fileExtension = $file->getClientOriginalExtension();
            $now = date('YmdHis');
            $username = explode(' ',Auth::user()->name)[0];
            $filename = $now . strtolower($username). ".".$fileExtension;
            $path = $file->move('uploads/referrals',$filename);
            $validated['hospital_referral'] = $path;
        }




        $bloodRequest->update($validated);

        return redirect()->route('myrequests')->with('success', 'Updated Successfully.');
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
