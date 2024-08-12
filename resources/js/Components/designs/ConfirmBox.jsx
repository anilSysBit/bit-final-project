import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";

import React from 'react'

const ConfirmBox = ({confirmingUserDeletion=false,setPropStat,title="Are you sure",yesName="Yes",note="",submitFunc}) => {

    const closeModal = () => {
        setPropStat(false);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        submitFunc();
        closeModal();
    }
  return (
    <Modal show={confirmingUserDeletion} onClose={closeModal}>
<form className="p-6" onSubmit={handleSubmit}>
    <h2 className="text-lg font-medium text-gray-900">
        {title}
    </h2>

    <p className="mt-1 text-sm text-gray-600">
        {note}
    </p>

    <div className="mt-6 flex justify-end">
        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

        <DangerButton className="ml-3" type="submit">
            {yesName}
        </DangerButton>
    </div>
</form>
</Modal>
  )
}

export default ConfirmBox