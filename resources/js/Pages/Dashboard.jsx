import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { asset } from "@/helpers/asset";
import BmsSidebar from "@/Components/backend/Sidebar";
import BmsTables from "@/Components/backend/tables/BmsTables";
import { Pending } from "@mui/icons-material";

const imgSrc = [
"https://img.freepik.com/free-psd/clock-icon-illustration_23-2151261483.jpg?t=st=1723272834~exp=1723276434~hmac=477392534aa847884ff2b4506cbc1029fc55830ab50f082be7cee4ccb5f68223&w=826",
"https://img.freepik.com/free-vector/3d-cartoon-style-checklist-with-green-checkmark-icon-list-with-completed-tasks-white-background-flat-vector-illustration-success-productivity-management-achievement-concept_778687-983.jpg?t=st=1723273115~exp=1723276715~hmac=8eb3add4fc2c8cff6d27b034b206fce4cbf4326be7a6e076f67fddc069b9bd9d&w=826",
"https://img.freepik.com/free-vector/speech-bubble-3d-icon-message-concept-realistic-speech-bubble-cross-chat-vector-message-box_90220-976.jpg?t=st=1723273161~exp=1723276761~hmac=065f5b6a854250efaed2bc177d381ba11de4846e7388b77c27071199ae8dfc1f&w=826",
"https://img.freepik.com/free-photo/paper-craft-art-cog-icon_53876-74769.jpg?t=st=1723273209~exp=1723276809~hmac=80a045b041d454f18e72d852276f26914517dd36024db81349a4371741992d7b&w=826"
]

export default function Dashboard(props) {
    console.log('dashboard',props)
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Dashboard" />
            <h1 className="text-2xl font-bold mb-5 mt-5 text-logo-blue">Hello Admin !</h1>
            <div className="bms_current flex min-h-[20vh] justify-between gap-5">
                {Object.entries(props.dashboardData).map(([key,value],index)=>{
                    return(
                        <div className="h-full w-1/4 p-2 rounded-md shadow-lg bg-white flex place-content-center place-items-center flex-col">
                    <img src={imgSrc[index]} alt="" className="h-20"/>
                    <p className="mt-1 text-2xl">{value}</p>
                    <p className="mt-2">{key.toUpperCase()}</p>
                </div>
                    )
                })}
            </div>
        </AuthenticatedLayout>
    );
}
