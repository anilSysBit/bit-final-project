import Navigation from '@/Components/frontend/Navigation';
import OurMissions from '@/Components/frontend/OurMissions';
import TopSlider from '@/Components/frontend/TopSlider';
import { Link, Head } from '@inertiajs/react';
import HomeAnalysis from '../Components/frontend/HomeAnalysis';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="">
                <Navigation props={props}/>
                <div className="body_container pt-3 pr-20 pl-20">
                    <TopSlider/>

                    <div className="donate_now_box flex place-content-center place-items-center gap-10  border p-10 bg-gray-200">
                        <p className='font-bold text-lg'>Help Save a Life</p>
                        <button className='p-2 min-w-[200px] border bg-blood-red text-white rounded-2xl '>Donate Now</button>
                    </div>

                    {/* <marquee behavior="loop" direction="" className="mt-5 p-10">
                        
                        <div className='text-center flex flex-col place-content-center place-items-center w-52 shadow shadow-black'>
                            <img src="https://picsum.photos/100" alt="complogo" className='w-20'/>
                            <p>Help Save Foundation</p>
                        </div>
                    </marquee> */}
                    <OurMissions/>

                    <HomeAnalysis/>
                </div>
            </div>
        </>
    );
}
