import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function OurMissions() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  

  const fakeSliderData =[
    {
        imgSrc:"https://img.freepik.com/free-vector/gradient-world-aids-day-landing-page-template_23-2149149552.jpg?t=st=1723203023~exp=1723206623~hmac=11323ce98fd89700a86d99096a90f2615db1de096b27c4efd0dc0f9dc0c66937&w=1380"
    },
    {
        imgSrc:"https://img.freepik.com/free-psd/movie-time-template_23-2151322628.jpg?t=st=1723203170~exp=1723206770~hmac=03b43d3316e32125d1175709deb4455f2768e6c82a3e646dff3071b164a04412&w=1380"
    },
    {
        imgSrc:"https://img.freepik.com/free-vector/flat-horizontal-banner-template-world-blood-donor-day-awareness_23-2150380167.jpg?t=st=1723203207~exp=1723206807~hmac=ea34d31af50a4d8860deb4790e54a8464e0bb3777cef1c9694a80a0c421d1e74&w=1380"
    },
    {
        imgSrc:"https://img.freepik.com/premium-photo/box-blood-themed-blood-drop-with-red-heart-front_1092575-59674.jpg?w=1480"
    }
  ]
  return (
    <>
    <p className="text-2xl mt-10 mb-5 text-center">Our Missions</p>
    <div className="slider-container">
    <Slider {...settings}>
        
        {fakeSliderData.map((elem,index)=>{
            return(
            <div className="mission_part h-[50vh]  overflow-hidden rounded p-5">
                <div className="box rounded-md h-full  bg-white text-center shadow-2xl">
                <img src={elem?.imgSrc} alt="" className="object-cover rounded h-2/3 w-full border " />
                    <p className=" mt-1 text-slate-500 font-bold text-2xl">Donate on Time</p>
                    <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia rerum architecto dolores unde aperiam!</p>
                </div>
              </div>
            )
        })}



    </Slider>
    </div>

    </>
  );
}