import DangerButton from "@/Components/DangerButton";
import ConfirmBox from "@/Components/designs/ConfirmBox";
import Navigation from "@/Components/frontend/Navigation";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link, useForm } from "@inertiajs/react";
import { RemoveRedEye,Edit } from "@mui/icons-material";
import React, { useState } from "react";

const MyRequests = (props) => {
    const [confirmingUserDeletion,setConfirmingUserDeletion] = useState(false);
    const [cancelId,setCancelId] = useState("");
    const confirmUserDeletion = (id) => {
        setConfirmingUserDeletion(true);
        setCancelId(id);
    };
    const searchParams = new URLSearchParams(window.location.search);
    const status = searchParams.get('status');

    console.log(status)

    const {data,setData,processing,patch} = useForm({
        status:"cancelled"
    });

    const handleChangeStatus =()=>{
        patch(`/blood/status/${cancelId}`,data,{
            onSuccess:(response)=>{
                console.log('Status reqponse',response)
            },
            onError:(error)=>{
                console.log('Request Failed',error);
            }
        });
        console.log('Working patch')
        
    }
    console.log("my requests props", props);
    return (
        <>
            <Navigation props={props} />
            <ConfirmBox confirmingUserDeletion={confirmingUserDeletion} setPropStat={setConfirmingUserDeletion} title="Are you sure you want to cancel this request?" note="If you cancel you would not be able to edit this data further. If you want new Blood have to create a new blood requeste from the form" submitFunc={handleChangeStatus}/>
            <p className="text-center mt-2 text-lg">My Requests</p>

            <ul className="flex place-content-center mt-5 gap-10">
                <Link className={`border p-1 rounded-lg hover:bg-heart-red hover:text-white ${!status && 'bg-heart-red text-white'}`} href={'/my-requests'}>
                    All
                </Link>
                <Link className={`border p-1 rounded-lg hover:bg-heart-red hover:text-white ${status==='pending' && 'bg-heart-red text-white'}`} href={'/my-requests?status=pending'}>
                    Pending
                </Link>
                <Link className={`border p-1 rounded-lg hover:bg-heart-red hover:text-white ${status=='completed' && 'bg-heart-red text-white'}`} href={'/my-requests?status=completed'}>
                    Completed
                </Link>
                <Link className={`border p-1 rounded-lg hover:bg-heart-red hover:text-white ${status=='onprocess' && 'bg-heart-red text-white'}`} href={'/my-requests?status=onprocess'}>
                    OnProcess
                </Link>
                <Link className={`border p-1 rounded-lg hover:bg-heart-red hover:text-white ${status=='cancelled' && 'bg-heart-red text-white'}`} href={'/my-requests?status=cancelled'}>
                    Cancelled
                </Link>
            </ul>
            <div className="request_container container mx-auto grid grid-cols-3 gap-5 mt-5">
                {props.requestData.map((elem, index) => {
                    const obj = {
                        'Patient Name': elem?.patient_name,
                        'Hospital Name': elem?.hospital_name,
                        'Quantity':elem?.quantity,
                        'Address': elem?.address,
                        'Phone': elem?.phone,
                        'Blood Group': elem?.blood_group,
                        'Has Referal Doc': elem?.hospital_referral ? 'Yes' : 'No'

                    }
                    return (
                        <div className="border shadow-lg min-h-80 relative rounded p-5">
                            <div className="header flex justify-between">
                                <p className="text-xs text-slate-500">
                                    Required At {elem?.required_date}  Before:{elem?.required_time}
                                </p>
                                <span className={`status ${elem.status}`}>
                                    {elem?.status}
                                </span>
                            </div>

                            <div className="min-h-[80%]">
                            <table className="w-full mt-2">
                                {Object.entries(obj).map(([key,value])=>{
                                    return(
                                        <tr>
                                            <td className="p-1 text-sm text-slate-500">{key}</td>
                                            <td className="p-1 text-sm text-slate-500">{value}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                            </div>

                            <div className="flex place-items-center place-content-center justify-between flex-nowrap">
                                
                            <p className="text-xs text-slate-500">Initiated Date : {new Date(elem?.created_at).toUTCString()} </p>
                            <div className="flex gap-1">
                                {elem?.status == 'pending' && <Link href={route('blood.edit',elem?.id)} className="border  p-1 rounded-lg bg-gray-300 h-8 w-8 flex place-content-center place-items-center text-white"><Edit color="success" fontSize="100"/></Link>}
                                {elem?.status == 'pending' && <button className="border  p-1 rounded-lg bg-red-300 h-8 w-20 text-xs flex place-content-center place-items-center text-gray-800
                                " onClick={()=>confirmUserDeletion(elem.id)}>Cancel</button>}
                            </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default MyRequests;
