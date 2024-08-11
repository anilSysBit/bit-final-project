import Navigation from "@/Components/frontend/Navigation";
import { Link } from "@inertiajs/react";
import { RemoveRedEye,Edit } from "@mui/icons-material";
import React from "react";

const MyRequests = (props) => {
    console.log("my requests props", props);
    return (
        <>
            <Navigation props={props} />

            <p className="text-center mt-2 text-lg">My Requests</p>

            <ul className="flex place-content-center mt-5 gap-10">
                <button className="border p-1 rounded-lg hover:bg-heart-red hover:text-white">
                    All
                </button>
                <button className="border p-1 rounded-lg hover:bg-heart-red hover:text-white">
                    Pending
                </button>
                <button className="border p-1 rounded-lg hover:bg-heart-red hover:text-white">
                    Completed
                </button>
                <button className="border p-1 rounded-lg hover:bg-heart-red hover:text-white">
                    OnProcess
                </button>
                <button className="border p-1 rounded-lg hover:bg-heart-red hover:text-white">
                    Cancelled
                </button>
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
                                {elem?.status == 'pending' && <button className="border  p-1 rounded-lg bg-red-300 h-8 w-20 text-xs flex place-content-center place-items-center text-gray-800">Cancel</button>}
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
