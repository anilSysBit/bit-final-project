import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { FilterBox, MainBmsTable, SearchBox, SelectBox, Tbody, Thead } from '@/Components/backend/tables/BmsTables'
import { CancelOutlined, CheckCircle, Delete, RemoveRedEye } from '@mui/icons-material'
import { Head, Link, router, useForm } from '@inertiajs/react'
import { Pagination, Switch } from '@mui/material'
import ConfirmBox from '@/Components/designs/ConfirmBox'



const List = (props) => {
    console.log('Users props',props)
    const [confirmDeleteRequest,setConfirmDeleteRequest] = useState(false);
    const [deleteId,setDeleteId] = useState(false);
    

    const [searchTerm,setSearchTerm] = useState('');
    const [status,setStatus] = useState('');
    const usersData = props.userData.data;
    const pagination  = props.userData;

    const searchParam = props?.params?.search || "";


    const handlePaginationChange =(e,page)=>{
        const obj ={};
        if(page){
            obj['page'] = page;
        }
        if(searchParam){
            obj['search'] = searchParam;
        }
        if(status){
            obj['status'] = status;
        }
        router.get(`/blood/list`,obj,{
            preserveState:true
        })
    }

    const handleConfirmRequestDeletion =(id)=>{
        setDeleteId(id);
        setConfirmDeleteRequest(true);
    }

    const deleteRequest =()=>{
        router.delete(`/blood/list/${deleteId}`,{
            onSuccess:()=>{
                console.log('Good to go')
            },
            onError:(error)=>{
                console.log("Error occured",error)
            }
        });
    }

    const handleSubmitSearch =(e)=>{
        e.preventDefault();
        const obj = {};
        if(searchTerm){
            obj['search'] = searchTerm
        }
        if(status){
            obj['status'] = status
        }
        router.get('/blood/list',obj,{
            preserveState:true
        });
    }
  return (
    <AuthenticatedLayout auth={props.auth}>
        <Head title='Blood Requests'/>
        <ConfirmBox 
            confirmingUserDeletion={confirmDeleteRequest} 
            setPropStat={setConfirmDeleteRequest} 
            title='Are you sure you want to delete the Request' 
            note='Only delete the item if you feel like it is wanted or spam you make harm the requester life.' 
            submitFunc={deleteRequest}
        />
        <p className='text-lg mb-5'>Users List</p>
        <FilterBox onSubmit={handleSubmitSearch}>
            <SelectBox options={['all','pending','onprocess','completed','cancelled']} setValue={setStatus} value={status || searchParam}/>
            <SearchBox setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
        </FilterBox>
        <MainBmsTable className="mt-5">
            <Thead>
                <th>SN</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Is Admin</th>
                <th>Is Active</th>
                <th>Actions</th>
            </Thead>
            <Tbody>
                {usersData.map((request,index)=>{
                    const date = new Date(request.required_date)
                    const format = date.toDateString()
                    return(
                        <tr>
                        <td className="text-gray-900">{index+1}</td>
                        <td className="text-gray-500">{request.name}</td>
                        <td className="text-gray-500">{request.email}</td>
                        <td className="text-gray-500">{request.created_at}</td>
                        <td className="text-gray-500">{request.is_admin ? <CheckCircle fontSize='100' color='success'/> : <CancelOutlined fontSize='100' color='error'/>}</td>
                        <td><Switch size='small'/></td>
                        <td>
                            <Link href={`/users/${request.id}`}><RemoveRedEye fontSize='100' className='text-gray-500 hover:text-nepal-blue'/></Link>
                            <button onClick={()=>handleConfirmRequestDeletion(request.id)}><Delete fontSize='100' className='text-red-500 ml-5'/></button>
                        </td>
                      </tr>
                    )
                })}
            </Tbody>
        </MainBmsTable>

        <Pagination variant='outlined' shape='rounded' onChange={handlePaginationChange}  count={pagination.last_page} page={pagination.current_page} className='mt-5'/>
    </AuthenticatedLayout>
  )
}

export default List