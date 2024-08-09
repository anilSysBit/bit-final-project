import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function TopSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
    <Slider {...settings}>
        {fakeSliderData.map((elem,index)=>{
            return(
            <div className="slider-part h-[60vh] rounded overflow-hidden">
                <img src={elem?.imgSrc} alt="" className="object-cover"/>
              </div>
            )
        })}



    </Slider>

    <style jsx>{`
                .slider-part{
                    // border:1px solid black;
                    img{
                        height:100%;
                        width:100%;
                        object-position:center;
                        object-fit:cover;
                    }
                }
        `}</style>
    </>
  );
}