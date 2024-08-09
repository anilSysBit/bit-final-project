import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { asset } from "@/helpers/asset";
import BmsSidebar from "@/Components/backend/Sidebar";


export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="dashboard_layout">
                <BmsSidebar/>
            </div>
        </AuthenticatedLayout>
    );
}
