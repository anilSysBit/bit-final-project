import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
const Details = (props) => {

    const user = props.userData;
  return (
    <AuthenticatedLayout auth={props.auth}>

        <p>User Details</p>

            <p className='text-3xl font-bold mt-10'>{user.name}</p>

            <p>{user.email}</p>


            <p className='mt-10'>User Roles and Permissions</p>


            

    </AuthenticatedLayout>
  )
}

export default Details