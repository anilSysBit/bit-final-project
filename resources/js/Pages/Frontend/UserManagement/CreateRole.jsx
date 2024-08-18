import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import { TextField } from '@mui/material'
import InputLabel from '@/Components/InputLabel'
import SecondaryButton from '@/Components/SecondaryButton'
import { useForm } from '@inertiajs/react'
import { MainBmsTable, Tbody, Thead } from '@/Components/backend/tables/BmsTables'
const CreateRole = (props) => {

    const {data,setData,post,processing,errors,reset} = useForm({
        name:"",
        description:""
    })
    const roles = props.roles;
    console.log(props)
    const handleChange =(e)=>{
        const name = e.target.name;
        setData(name,e.target.value);
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        post(route('user.role'),data);
        reset();
    }
  return (
    <AuthenticatedLayout auth={props.auth}>
        <h1>Roles and Permissions</h1>

        {/* <SecondaryButton className='primary'>Create a new Role</SecondaryButton> */}
        <form className="mt-6 " onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="w-[49%]">
                <InputLabel value="Role Name"/>
                <TextField className='mt-1 block w-full' name='name' onChange={handleChange} value={data.name}/>
            </div>

            <div className="w-[49%] mt-2">
                <InputLabel value="Description"/>
                <TextField className='mt-1 block w-full' name='description' onChange={handleChange} value={data.description}/>
            </div>

            <p className='text-red-500 text-xs mt-1'>{JSON.stringify(errors)}</p>
            <PrimaryButton disabled={processing} className='mt-2'>Create</PrimaryButton>
        </form>


        {/* Table for role listing */}

<p className='mt-5'></p>
        <MainBmsTable>
            <Thead>
                <th>SN</th>
                <th>Name</th>
                <th>Description</th>
            </Thead>

            <Tbody>
                {roles && roles.map((elem,index)=>{
                    return(
                        <tr>
                            <td>{index+1}</td>
                            <td>{elem?.name}</td>
                            <td>{elem?.description}</td>
                        </tr>
                    )
                })}
            </Tbody>
        </MainBmsTable>

    </AuthenticatedLayout>
  )
}

export default CreateRole