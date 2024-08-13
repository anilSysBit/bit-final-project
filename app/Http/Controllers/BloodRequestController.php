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
    public function index(Request $request)
    {
        //
        $query = $request->query('search');
        $status = $request->query('status');

        $bloodRequest = BloodRequest::query();


        if($query){
            $bloodRequest->where('patient_name','like',"%{$query}%");
        }
        if($status && $status != 'all'){
            $bloodRequest->where('status',$status);


        }

        $bloodRequest = $bloodRequest->paginate(10);

        return Inertia::render('Frontend/Blood/List',[
            'blood_requests' => $bloodRequest,
            'params'=>[
                'search'=>$query,
                'select'=>$status
            ]
        ]);
    }


    public function user(Request $request){
        $status = $request->query('status');
        $requestData = Auth::user()->bloodRequests;


        if($status){
            $data = $requestData->where('status', $status)->values()->toArray();
            return Inertia::render('Frontend/Blood/MyRequests',[
                'requestData'=>$data,
            ]);
        }else{
            return Inertia::render('Frontend/Blood/MyRequests',[
                'requestData'=>$requestData,
            ]);
        }


    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return Inertia::render('Frontend/Blood/Create',[
            'constants'=> $this->constants,
            'method'=>'POST'
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
                'required_time'=>'required|string',
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
            return redirect()->route('myrequests')->with('success', 'Blood request created successfully.');
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
                'user_id' => 'nullable',
                'patient_name' => 'sometimes|string|max:255',
                'phone'=> 'sometimes|string',
                'address'=> 'sometimes|string|max:255',
                'hospital_name'=> 'sometimes|string|max:255',
                'quantity'=> 'sometimes|min:1|max:5|numeric',
                'gender'=>'sometimes|string|max:100',
                'blood_group'=>'sometimes|string|max:10',
                'other'=> 'nullable|string|max:1000',
                'required_date'=>'sometimes|date',
                'required_time'=>'sometimes|string',
                'hospital_referral'=>'nullable|file|mimes:jpeg,png,jpg|max:2048'
            ]);
    

    
            
            $bloodRequest = BloodRequest::findOrFail($id);
            
            if($request->hasFile('hospital_referral')){
                
                $file = $request->file('hospital_referral');
                
                $fileExtension = $file->getClientOriginalExtension();
                $now = date('YmdHis');
                $username = explode(' ',Auth::user()->name)[0];
                $filename = $now . strtolower($username). ".".$fileExtension;
                $path = $file->move('uploads/referrals',$filename);
                $validated['hospital_referral'] = $path;
            }else{
                $validated['hospital_referral'] = $bloodRequest->hospital_referral;
                
            }
    
    
    
    
            $bloodRequest->update($validated);
    
            return redirect()->route('myrequests')->with('success', 'Updated Successfully.');

    }


    public function changeStatus(Request $request,$id){
        $validated = $request->validate([
            "status"=> 'required|string',
        ]);

        $bloodRequest = BloodRequest::findOrFail($id);

        $bloodRequest->update($validated);
        $user = Auth::id();

        
        if($user == $bloodRequest->user_id){
            return redirect()->route('myrequests')->with('success', 'Cancelled the Request');

        }
        return redirect()->route('myrequests')->with('success', 'Status Changed Successfully.');
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
        BloodRequest::destroy($id);
        return redirect()->route('blood.list')->with('success', 'Deleted Successfully.');
    }
}
