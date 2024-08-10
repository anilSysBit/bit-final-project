import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { MainBmsTable, Tbody, Thead } from '@/Components/backend/tables/BmsTables'
import { Delete, RemoveRedEye } from '@mui/icons-material'
import { Link, router } from '@inertiajs/react'
import { Pagination } from '@mui/material'



const List = (props) => {
    const bloodRequests = props.blood_requests.data;
    const pagination  = props.blood_requests;


    const handlePaginationChange =(e,page)=>{
        router.visit(`/blood/list?page=${page}`)
    }
  return (
    <AuthenticatedLayout auth={props.auth}>
        <p className='text-lg mb-5'>Blood Request List</p>
        <MainBmsTable className="mt-5">
            <Thead>
                <th>SN</th>
                <th>Name</th>
                <th>Request Date</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Hospital</th>
                <th>Quantity</th>
                <th>Actions</th>

            </Thead>
            <Tbody>
                {bloodRequests.map((request,index)=>{
                    const date = new Date(request.required_date)
                    const format = date.toDateString()
                    return(
                        <tr>
                        <td className="text-gray-900">{index+1}</td>
                        <td className="text-gray-500">{request.patient_name}</td>
                        <td className="text-gray-500">{format}</td>
                        <td className="text-gray-500">{request.phone}</td>
                        <td className={`text-gray-500`}>
                            <dev className={`status ${request?.status}`}>{request.status}</dev>
                        </td>
                        <td className="text-gray-500">{request.hospital_name}</td>
                        <td className="text-gray-500">{request.quantity}</td>
                        <td>
                            <Link><RemoveRedEye fontSize='100' className='text-gray-500 hover:text-nepal-blue'/></Link>
                            <Link><Delete fontSize='100' className='text-red-500 ml-5'/></Link>
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