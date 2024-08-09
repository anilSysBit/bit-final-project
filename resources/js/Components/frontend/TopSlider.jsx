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
      imgSrc:"https://img.freepik.com/free-vector/business-banner-with-space-your-text_1017-19582.jpg?t=st=1723218413~exp=1723222013~hmac=6e4ae1db578455afda39487715c4663d74b239596ca148b05a075f0ae99c30ca&w=1380"
  },


    {
        imgSrc:"https://img.freepik.com/free-vector/flat-horizontal-banner-template-world-blood-donor-day-awareness_23-2150380167.jpg?t=st=1723203207~exp=1723206807~hmac=ea34d31af50a4d8860deb4790e54a8464e0bb3777cef1c9694a80a0c421d1e74&w=1380"
    },
    {
        imgSrc:"https://img.freepik.com/free-vector/realistic-horizontal-banner-template-world-hemophilia-day-awareness_23-2151301264.jpg?t=st=1723218103~exp=1723221703~hmac=c86f48770319353f7218b0d6daa4958ae38aca412380946d1bfee0a2a3e9bff3&w=1380"
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