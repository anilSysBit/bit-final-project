
import { asset } from "@/helpers/asset";

export default function ApplicationLogo(props) {
    return (
        <img src={asset('logo1.jpeg')} alt="" width={50} height={50} className="rounded-full shadow shadow-black"/>
    );
}
