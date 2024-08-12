import Navigation from '@/Components/frontend/Navigation'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { asset } from '@/helpers/asset'
import { useForm } from '@inertiajs/react'
import React from 'react'

const Create = (props) => {
    console.log('Create props',props)
    const prevData = props.prevData;

    const {data,setData,post,put,patch,processing,errors} = useForm({
        patient_name:prevData?.patient_name || "",
        phone:prevData?.phone || "",
        quantity:prevData?.quantity || "",
        hospital_name:prevData?.hospital_name || "",
        address:prevData?.address || "",
        gender:prevData?.gender || "",
        blood_group:prevData?.blood_group || "",
        other:prevData?.other || "",
        required_date:prevData?.required_date || "",
        required_time:prevData?.required_time || "",
        hospital_referral:null,
    })



    const submit = async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        if(props.method=='POST'){
            post('/blood/store', formData);
        }else{
            patch(`/blood/edit/${prevData.id}`, formData);
        }
    }

    const handleChange =(e)=>{
        const name = e.target.name;
        setData(name,e.target.value);
    }

    const handleFileChange = (e) => {
        setData('hospital_referral', e.target.files[0]);
    };
  return (
    <>
        <Navigation props={props}/>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <section className="p-4 mt-5 sm:p-8 bg-white shadow sm:rounded-lg" >
                <p className='font-bold text-lg'>Create a Blood Request</p>
                <form onSubmit={submit} className="mt-6  flex justify-between gap-5 flex-wrap" encType='multipart/form-data'>
                    <div className='w-[49%]'>
                        <InputLabel value="Patient Name"/>
                        <TextInput 
                            className="mt-1 block w-full"
                            name="patient_name"
                            onChange={handleChange}
                            value={data?.patient_name}
                        />
                        <InputError className="mt-2" message={errors.patient_name}/>
                    </div>

                    <div className='w-[49%]'>
                        <InputLabel className='sr_only' value="Phone"/>
                        <TextInput
                            name="phone"
                            onChange={handleChange}
                            value={data?.phone}
                            className="mt-1 block w-full"
                            
                        />
                        <InputError className="mt-2" message={errors.phone}/>
                    </div>
                    <div className='w-[49%]'>
                        <InputLabel className='sr_only' value="Address"/>
                        <TextInput
                        
                            className="mt-1 block w-full"
                            name="address"
                            onChange={handleChange}
                            value={data?.address}
                        />
                        <InputError className="mt-2" message={errors?.address}/>
                    </div>
                    <div className='w-[49%]'>
                        <InputLabel className='sr_only' value="Hostital Name"/>
                        <TextInput
                            className="mt-1 block w-full"
                            name="hospital_name"
                            onChange={handleChange}
                            value={data?.hospital_name}
                            
                        />
                        <InputError className="mt-2" message={errors.hospital_name}/>
                    </div>
                    <div className='w-[49%]'>
                        <InputLabel className='sr_only' value="Quantity"/>
                        <TextInput
                            className="mt-1 block w-full"
                            name="quantity"
                            onChange={handleChange}
                            value={data?.quantity}
                            
                        />
                        <InputError className="mt-2" message={errors.quantity}/>
                    </div>

                    <div className='w-[49%]'>
                        <InputLabel className='sr_only' value="Gender"/>
                        <select className='mt-1 block w-full rounded-md border-slate-300' name="gender" onChange={handleChange} value={data.gender}>
                            <option disabled value="">Select Gender</option>
                        {props.constants.genderOptions.map((elem,index)=>{
                                return(
                                    <option value={elem} className='capitalize'>{elem}</option>
                                )
                            })}
                        </select>
                        <InputError className="mt-2" message={errors?.gender}/>
                    </div>

                    <div className='w-[49%]'>
                        <InputLabel className='sr_only' value="Blood Group"/>
                        <select name="blood_group" id="" className='mt-1 block w-full rounded-md border-slate-300'
                            onChange={handleChange}
                            value={data?.blood_group}>
                                <option disabled value="">Choose Blood Group</option>
                            {props.constants.bloodOptions.map((elem,index)=>(
                                <option value={elem}>{elem}</option>
                            ))}
                        </select>
                        <InputError className="mt-2" message={errors?.blood_group}/>
                    </div>
                    <div className='w-[49%]'>
                        <InputLabel className='sr_only' value="Other Details"/>
                        <textarea
                            className="mt-1 block w-full rounded border border-slate-300"
                            name="other"
                            onChange={handleChange}
                            value={data?.other}
                        />
                        <InputError className="mt-2" message={errors?.other}/>
                    </div>

                    <div className='w-[49%]'>
                        <InputLabel className='sr_only' value="Required Before"/>
                        <div className='flex w-full mt-1'>
                        <TextInput
                            type="date"
                            className="w-full"
                            min={new Date(Date.now()).toISOString().split('T')[0]}
                            name="required_date"
                            onChange={handleChange}
                            value={data?.required_date}
                            
                        />
                        <select className='rounded border border-slate-300' name='required_time' onChange={handleChange} value={data?.required_time}>
                            <option value="" disabled>Select time</option>
                            {props.constants.timeOptions && props.constants.timeOptions.map((elem,index)=>(
                                <option value={elem}>{elem}</option>
                            ))}

                        </select>
                        </div>
                        <InputError className="mt-2" message={errors?.required_date}/>
                    </div>

                    <div className='w-[49%] relative'>
                        <InputLabel className='sr_only' value="Hospital Referal Image"/>
                        <TextInput
                            type="file"
                            className="mt-1 block w-full opacity-0 absolute"
                            accept="image/*"
                            onChange={handleFileChange}

                        />
                        <button type='button' className='bg-orange-200 p-1 rounded-lg text-xs mt-1 min-w-[200px] min-h-10'>Choose Image</button>
                        {(data.hospital_referral) && <img src={URL.createObjectURL(data.hospital_referral)} alt=""  className='h-20 mt-2 shadow-lg'/>}
                        {(prevData?.hospital_referral && !data.hospital_referral) && <img src={`/${prevData.hospital_referral}`} alt=""  className='h-20 mt-2 shadow-lg'/>}
                        <InputError className="mt-2" message={errors?.hospital_referral}/>
                    </div>

                    <div>
                        <PrimaryButton disabled={processing} className=''>Submit</PrimaryButton>
                    </div>
                </form>
            </section>
        </div>

        
    </>
  )
}

export default Create